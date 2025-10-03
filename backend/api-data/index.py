'''
Business: Универсальный API для всех данных сайта (посты, стримы, розыгрыши, уведомления)
Args: event - dict с httpMethod, queryStringParameters, path
      context - object с request_id, function_name
Returns: HTTP response с данными
'''
import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    resource_type = params.get('type', 'posts')
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    result = {}
    
    if resource_type == 'posts':
        category = params.get('category', 'all')
        sort_by = params.get('sort', 'hot')
        
        query = """
            SELECT p.id, p.title, p.content, p.image_url, p.category,
                   p.rating, p.views, p.comments_count, p.bookmarks_count,
                   p.created_at,
                   u.id, u.username, u.avatar_url, u.rating as user_rating
            FROM posts p
            JOIN users u ON p.author_id = u.id
        """
        
        params_list = []
        if category != 'all':
            query += " WHERE p.category = %s"
            params_list.append(category)
        
        if sort_by == 'hot':
            query += " ORDER BY (p.rating + p.views/100) DESC"
        elif sort_by == 'new':
            query += " ORDER BY p.created_at DESC"
        elif sort_by == 'top':
            query += " ORDER BY p.rating DESC"
        
        query += " LIMIT 50"
        
        cur.execute(query, params_list) if params_list else cur.execute(query)
        rows = cur.fetchall()
        
        posts = []
        for row in rows:
            post_id = row[0]
            cur.execute("SELECT tag FROM post_tags WHERE post_id = %s", (post_id,))
            tags = [tag_row[0] for tag_row in cur.fetchall()]
            
            posts.append({
                'id': post_id,
                'title': row[1],
                'content': row[2],
                'image': row[3],
                'category': row[4],
                'rating': row[5],
                'views': row[6],
                'comments': row[7],
                'bookmarks': row[8],
                'time': row[9].isoformat() if row[9] else '',
                'author': row[11],
                'authorAvatar': row[12],
                'authorRating': row[13],
                'tags': tags
            })
        
        result = {'posts': posts}
    
    elif resource_type == 'streams':
        category = params.get('category', 'all')
        live_only = params.get('live_only') == 'true'
        
        query = """
            SELECT s.id, s.title, s.description, s.category, s.platform,
                   s.thumbnail_url, s.stream_url, s.is_live, s.viewers,
                   s.started_at, s.language,
                   u.id, u.username, u.avatar_url, u.rating
            FROM streams s
            JOIN users u ON s.streamer_id = u.id
            WHERE 1=1
        """
        
        params_list = []
        if category != 'all':
            query += " AND s.category = %s"
            params_list.append(category)
        
        if live_only:
            query += " AND s.is_live = true"
        
        query += " ORDER BY s.viewers DESC LIMIT 50"
        
        cur.execute(query, params_list)
        rows = cur.fetchall()
        
        streams = []
        for row in rows:
            stream_id = row[0]
            cur.execute("SELECT tag FROM stream_tags WHERE stream_id = %s", (stream_id,))
            tags = [tag_row[0] for tag_row in cur.fetchall()]
            
            streams.append({
                'id': stream_id,
                'title': row[1],
                'description': row[2],
                'category': row[3],
                'platform': row[4],
                'thumbnail': row[5],
                'streamUrl': row[6],
                'isLive': row[7],
                'viewers': row[8],
                'startedAt': row[9].isoformat() if row[9] else '',
                'language': row[10],
                'streamer': row[12],
                'streamerAvatar': row[13],
                'streamerRating': row[14],
                'tags': tags
            })
        
        result = {'streams': streams}
    
    elif resource_type == 'giveaways':
        status = params.get('status', 'active')
        
        query = """
            SELECT g.id, g.title, g.description, g.prize, g.image_url,
                   g.is_official, g.participants_count, g.max_participants,
                   g.end_date, g.winner_count, g.status,
                   u.id, u.username, u.avatar_url, u.rating
            FROM giveaways g
            JOIN users u ON g.author_id = u.id
            WHERE g.status = %s
            ORDER BY g.end_date ASC
            LIMIT 50
        """
        
        cur.execute(query, (status,))
        rows = cur.fetchall()
        
        giveaways = []
        for row in rows:
            giveaway_id = row[0]
            
            cur.execute("SELECT requirement FROM giveaway_requirements WHERE giveaway_id = %s", (giveaway_id,))
            requirements = [req_row[0] for req_row in cur.fetchall()]
            
            cur.execute("SELECT tag FROM giveaway_tags WHERE giveaway_id = %s", (giveaway_id,))
            tags = [tag_row[0] for tag_row in cur.fetchall()]
            
            end_date = row[8]
            days_left = (end_date - datetime.now()).days if end_date else 0
            
            month_names = {
                1: 'января', 2: 'февраля', 3: 'марта', 4: 'апреля',
                5: 'мая', 6: 'июня', 7: 'июля', 8: 'августа',
                9: 'сентября', 10: 'октября', 11: 'ноября', 12: 'декабря'
            }
            
            end_date_str = f"{end_date.day} {month_names[end_date.month]} {end_date.year}" if end_date else ''
            
            giveaways.append({
                'id': giveaway_id,
                'title': row[1],
                'description': row[2],
                'prize': row[3],
                'image': row[4],
                'isOfficial': row[5],
                'participants': row[6],
                'maxParticipants': row[7],
                'endDate': end_date_str,
                'daysLeft': days_left,
                'winnerCount': row[9],
                'status': row[10],
                'author': row[12],
                'authorAvatar': row[13],
                'authorRating': row[14],
                'requirements': requirements,
                'tags': tags,
                'isParticipating': False
            })
        
        result = {'giveaways': giveaways}
    
    elif resource_type == 'notifications':
        headers = event.get('headers') or {}
        user_id = headers.get('x-user-id', '1')
        
        cur.execute("""
            SELECT id, type, title, message, link, icon, is_read, created_at
            FROM notifications
            WHERE user_id = %s
            ORDER BY created_at DESC
            LIMIT 50
        """, (int(user_id),))
        
        rows = cur.fetchall()
        notifications = []
        
        for row in rows:
            notifications.append({
                'id': row[0],
                'type': row[1],
                'title': row[2],
                'message': row[3],
                'link': row[4],
                'icon': row[5],
                'isRead': row[6],
                'time': row[7].isoformat() if row[7] else ''
            })
        
        unread_count = sum(1 for n in notifications if not n['isRead'])
        result = {'notifications': notifications, 'unreadCount': unread_count}
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result),
        'isBase64Encoded': False
    }

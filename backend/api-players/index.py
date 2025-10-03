'''
Business: API для поиска игроков с фильтрами
Args: event - dict с httpMethod, queryStringParameters (game, region, search, online, lfg)
      context - object с request_id, function_name
Returns: HTTP response с данными игроков
'''
import json
import os
import psycopg2
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
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
    game_key = params.get('game', 'all')
    region = params.get('region', 'all')
    search_query = params.get('search', '')
    online_only = params.get('online') == 'true'
    lfg_only = params.get('lfg') == 'true'
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    query_parts = ["""
        SELECT DISTINCT u.id, u.username, u.avatar_url, u.level, u.rating,
               u.region, u.languages, u.is_online, u.last_seen, u.looking_for_team
        FROM users u
        LEFT JOIN user_game_stats ugs ON u.id = ugs.user_id
        LEFT JOIN games g ON ugs.game_id = g.id
        WHERE 1=1
    """]
    
    params_list: List[Any] = []
    
    if game_key != 'all':
        query_parts.append(" AND g.game_key = %s")
        params_list.append(game_key)
    
    if region != 'all':
        query_parts.append(" AND u.region = %s")
        params_list.append(region)
    
    if search_query:
        query_parts.append(" AND u.username ILIKE %s")
        params_list.append(f'%{search_query}%')
    
    if online_only:
        query_parts.append(" AND u.is_online = true")
    
    if lfg_only:
        query_parts.append(" AND u.looking_for_team = true")
    
    query_parts.append(" ORDER BY u.rating DESC LIMIT 50")
    
    final_query = ''.join(query_parts)
    cur.execute(final_query, params_list)
    
    rows = cur.fetchall()
    user_ids = [row[0] for row in rows]
    
    players = []
    for row in rows:
        user_id = row[0]
        
        cur.execute("""
            SELECT g.game_key, g.name, g.icon, ugs.rank, ugs.hours_played
            FROM user_game_stats ugs
            JOIN games g ON ugs.game_id = g.id
            WHERE ugs.user_id = %s
            ORDER BY ugs.is_main_game DESC, ugs.hours_played DESC
        """, (user_id,))
        
        game_stats = []
        for game_row in cur.fetchall():
            game_stats.append({
                'id': game_row[0],
                'name': game_row[1],
                'icon': game_row[2],
                'rank': game_row[3],
                'hours': game_row[4]
            })
        
        cur.execute("""
            SELECT style FROM play_styles WHERE user_id = %s
        """, (user_id,))
        
        play_styles = [style_row[0] for style_row in cur.fetchall()]
        
        players.append({
            'id': str(user_id),
            'username': row[1],
            'avatar': row[2],
            'level': row[3],
            'rating': row[4],
            'region': row[5],
            'languages': row[6],
            'isOnline': row[7],
            'lastSeen': row[8].isoformat() if row[8] else '',
            'lookingForTeam': row[9],
            'games': game_stats,
            'playStyle': play_styles
        })
    
    cur.execute("SELECT COUNT(*) FROM users")
    total_players = cur.fetchone()[0]
    
    cur.execute("SELECT COUNT(*) FROM users WHERE is_online = true")
    online_count = cur.fetchone()[0]
    
    cur.execute("SELECT COUNT(*) FROM users WHERE looking_for_team = true")
    lfg_count = cur.fetchone()[0]
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'players': players,
            'stats': {
                'total': total_players,
                'online': online_count,
                'lookingForTeam': lfg_count
            }
        }),
        'isBase64Encoded': False
    }

'''
Business: API для получения списка игр и их статистики
Args: event - dict с httpMethod, queryStringParameters
      context - object с request_id, function_name
Returns: HTTP response с данными игр
'''
import json
import os
import psycopg2
from typing import Dict, Any

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
    category = params.get('category', 'all')
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    if category == 'all':
        cur.execute("""
            SELECT id, game_key, name, icon, category, players_count, 
                   growth_percent, avg_rating
            FROM games
            ORDER BY players_count DESC
        """)
    else:
        cur.execute("""
            SELECT id, game_key, name, icon, category, players_count, 
                   growth_percent, avg_rating
            FROM games
            WHERE category = %s
            ORDER BY players_count DESC
        """, (category,))
    
    rows = cur.fetchall()
    games = []
    
    for row in rows:
        games.append({
            'id': row[1],
            'name': row[2],
            'icon': row[3],
            'category': row[4],
            'players': row[5],
            'growth': float(row[6]),
            'rating': float(row[7])
        })
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'games': games}),
        'isBase64Encoded': False
    }

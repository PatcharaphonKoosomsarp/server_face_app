from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)
app.secret_key = 'your_secret_key'

GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'  # เปลี่ยนเป็น Client ID จริง

def verify_token(id_token):
    url = f'https://oauth2.googleapis.com/tokeninfo?id_token={id_token}'
    response = requests.get(url)
    if response.status_code != 200:
        return None
    data = response.json()

    if data.get('aud') != GOOGLE_CLIENT_ID:
        return None
    return data

@app.route('/')
def index():
    return render_template('register_login.html')

@app.route('/api/google-login', methods=['POST'])
def google_login():
    req = request.get_json()
    id_token = req.get('id_token')

    if not id_token:
        return jsonify({'error': 'Missing ID token'}), 400

    user_info = verify_token(id_token)
    if not user_info:
        return jsonify({'error': 'Invalid token'}), 400

    email = user_info.get('email')
    name = user_info.get('name')
    first_name = user_info.get('given_name')
    last_name = user_info.get('family_name')

    student_id = None
    if email and email.startswith('s'):
        student_id = email.split('@')[0][1:]

    return jsonify({
        'email': email,
        'student_id': student_id,
        'name': name,
        'first_name': first_name,
        'last_name': last_name
    })

if __name__ == '__main__':
    app.run(debug=True)

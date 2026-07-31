import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()

from django.contrib.auth.models import User

# List all superusers first so you can confirm
for u in User.objects.filter(is_superuser=True):
    print(f"Found superuser: id={u.id}, username={u.username}")

# Change the username and password back to your originals
username_to_set = "Kantapon"      # <-- replace with your original username
password_to_set = "your_password" # <-- replace with your original password

user = User.objects.get(is_superuser=True)
user.username = username_to_set
user.set_password(password_to_set)
user.save()
print(f"Done! Restored username='{user.username}' and password.")

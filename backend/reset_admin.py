import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()

from django.contrib.auth.models import User
users = User.objects.filter(is_superuser=True)
if users.exists():
    user = users.first()
    user.set_password('Tharabliss123')
    user.username = 'admin' # Force username to admin
    user.save()
    print(f"Updated superuser: {user.username}")
else:
    User.objects.create_superuser('admin', 'admin@example.com', 'admin1234')
    print("Created new superuser: admin")

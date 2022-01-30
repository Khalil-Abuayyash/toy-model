from django.core.mail import send_mail
from django.conf import settings

def send_verification_code():
    send_mail(
        'Verification Code',
        'Use this verification code 112345 to change your password',
        settings.EMAIL_HOST_USER ,
        ['khalil.abuayyash@qudra.ps'],
        fail_silently=False
    )

    

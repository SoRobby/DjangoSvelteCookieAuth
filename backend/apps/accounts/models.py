from uuid import uuid4

from apps.accounts.managers import AccountManager
from apps.core.models import Country
from django.contrib.auth.models import AbstractBaseUser
from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models


# Models
class Account(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True, verbose_name='Email', help_text='Unique email address')

    username = models.CharField(max_length=16, unique=True,
                                validators=[
                                    RegexValidator(regex='^[a-zA-Z0-9_]*$',
                                                   message='Username must be alphanumeric or contain any of the'
                                                           ' following: "_"',
                                                   code='invalid_username'),
                                    MinLengthValidator(limit_value=4,
                                                       message='Username must be at least 4 characters long')
                                ],
                                verbose_name='Username', help_text='Unique username associated with the account')

    first_name = models.CharField(max_length=120, blank=True, verbose_name='First name',
                                  help_text='First name of the user')

    last_name = models.CharField(max_length=120, blank=True, verbose_name='Last name',
                                 help_text='Last name of the user')

    bio = models.TextField(max_length=1000, blank=True, verbose_name='Bio', help_text='User bio')

    is_active = models.BooleanField(default=True, verbose_name='Active',
                                    help_text='Designates whether this user should be treated as active')

    is_staff = models.BooleanField(default=False, verbose_name='Staff status',
                                   help_text='Designates whether the user can log into this admin site')

    is_admin = models.BooleanField(default=False, verbose_name='Admin status',
                                   help_text='Designates whether the user can log into this admin site')

    is_superuser = models.BooleanField(default=False, verbose_name='Superuser status',
                                       help_text='Designates that this user has all permissions without explicitly '
                                                 'assigning them')

    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='Country',
                                help_text='Country of the user')

    uuid = models.UUIDField(default=uuid4, editable=False, unique=True, verbose_name='UUID',
                            help_text='Unique identifier for the account')

    date_created = models.DateTimeField(auto_now_add=True, verbose_name='Date created',
                                        help_text='Server date and time the account was created')

    date_last_logged_in = models.DateTimeField(auto_now=True, verbose_name='Date last logged in',
                                               help_text='Server date and time the account last logged in')

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        ordering = ['-date_created']
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'

    def __str__(self) -> str:
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label) -> bool:
        return True

    def generate_new_email_verification_token(self):
        self.email_verification_token = uuid4()
        self.save()


    @property
    def name(self):
        if self.first_name and self.last_name:
            return f'{self.first_name} {self.last_name}'
        elif self.first_name:
            return self.first_name
        else:
            return self.username



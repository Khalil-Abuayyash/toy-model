from django.urls import path
from .views import CookieView, LogViewSet, OrganizationMembershipViewSet, OrganizationViewSet, RoleViewSet, SiteViewSet, TeamMembershipViewSet, TeamViewSet, BlacklistTokenUpdateView \
    , ProjectViewSet, TeamSiteViewSet, TicketViewSet, UserViewSet
from rest_framework.routers import DefaultRouter
from users.googleView import GoogleView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'sites', SiteViewSet, basename='site')
router.register(r'organizations', OrganizationViewSet, basename='organization')
router.register(r'teamsites', TeamSiteViewSet, basename='teamsite')
# router.register(r'teamprojects', TeamProjectViewSet, basename='teamproject')
router.register(r'organizationmemberships', OrganizationMembershipViewSet, basename='organizationmembership')
router.register(r'teammemberships', TeamMembershipViewSet, basename='teammembership')
router.register(r'tickets', TicketViewSet, basename='tickets')
router.register(r'logs', LogViewSet, basename='logs')
router.register(r'roles', RoleViewSet, basename='roles')

app_name = 'users'

urlpatterns = [
    path('google/', GoogleView.as_view()),
    path('cookie/', CookieView.as_view()),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
]

urlpatterns += router.urls
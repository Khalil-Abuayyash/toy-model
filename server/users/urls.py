from django.urls import path
from .views import OrganizationMembershipViewSet, OrganizationViewSet, SiteViewSet, TeamMembershipViewSet, TeamViewSet, BlacklistTokenUpdateView \
    , ProjectViewSet, TeamSiteViewSet, UserViewSet
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

app_name = 'users'

urlpatterns = [
    path('google/', GoogleView.as_view()),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
]

urlpatterns += router.urls
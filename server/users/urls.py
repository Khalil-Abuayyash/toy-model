from django.urls import path
from rest_framework.routers import DefaultRouter
from users.googleView import GoogleView

from .views import \
                 AlertViewSet, AuthenticatedView, CookieView, DashboardViewSet, LogViewSet, OrganizationMembershipViewSet \
                , OrganizationViewSet, ParameterViewSet, QueryViewSet, ReportViewSet, RoleViewSet, SesssionViewSet \
                , SiteViewSet, StatisticViewSet, TeamMembershipViewSet, TeamViewSet, BlacklistTokenUpdateView \
                , ProjectViewSet, TeamSiteViewSet, ThingViewSet, TicketViewSet, UserViewSet

app_name = 'users'

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
router.register(r'alerts', AlertViewSet, basename='alerts')
router.register(r'reports', ReportViewSet, basename='reports')
router.register(r'sessions', SesssionViewSet, basename='sessions')
router.register(r'dashboards', DashboardViewSet, basename='dashboards')
router.register(r'statistics', StatisticViewSet, basename='statistics')
router.register(r'things', ThingViewSet, basename='things')
router.register(r'parameters', ParameterViewSet, basename='parameters')
router.register(r'queries', QueryViewSet, basename='queries' )

urlpatterns = [
    path('authenticated/<int:user_id>/', AuthenticatedView.as_view()),
    path('google/', GoogleView.as_view()),
    path('cookie/', CookieView.as_view()),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
]

urlpatterns += router.urls
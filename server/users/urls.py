from django.urls import path
from .views import OrganizationMembershipList, TeamMembershipList, UserCreate, BlacklistTokenUpdateView, ProjectList, ProjectDetail, OrganizationList, SiteList,TeamSiteList

# teams
# orgaizations
# sites
# users
# projects
# team membership
# org membership
# team site
# team project

app_name = 'users'

urlpatterns = [
    path('create/', UserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('projects/', ProjectList.as_view()),
    path('projects/<int:pk>/', ProjectDetail.as_view()),
    path('organizations/', OrganizationList.as_view()),
    path('sites/', SiteList.as_view()),
    path('teamsites/', TeamSiteList.as_view()),
    path('team_memberships/', TeamMembershipList.as_view()),
    path('organization_memberships/', OrganizationMembershipList.as_view()),
]



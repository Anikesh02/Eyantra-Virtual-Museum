from django.urls import path  # we gonna define path to different web pages
from django.conf import settings
from django.conf.urls.static import static
from . import views

# we can determine which path we have to go based on the path user types in.
urlpatterns = [
     # Static files
    *static(settings.STATIC_URL, document_root=settings.STATIC_ROOT),
    path("",views.home,name="home"),
    path("india",views.indiaMap,name="indiaMap"),
    path("commonLobby",views.commonLobby,name="commonLobby"),
    path("indiaLobby/<str:state_code>/",views.indiaLobby,name="indiaLobby"),
    path('modelPage/<slug:pk>', views.model_page, name='model_page'),
    path('login/',views.loginPage,name="login"),
    path('logout/',views.logoutUser,name="logout"),
    path('register/',views.registerUser,name="register"),
    path('quiz/',views.quiz,name='quiz'),
    path('edition/<int:pk>/',views.edition,name='edition'),
    # path('register',views.register,name='register'),
    # path('login',views.login,name='login'),
]
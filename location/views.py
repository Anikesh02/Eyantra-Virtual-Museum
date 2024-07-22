from json import dumps

from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from location.models import Exhibition_Entry, Question, Choice
from django.contrib import messages
from django.db.models import Prefetch
from .models import STATE_CHOICES


def home(request):
    return render(request,'main/landing.html',{})


def indiaMap(request):
    exhibition_entries = Exhibition_Entry.objects.all()
    data = []
    for exhibit in exhibition_entries:
        stateCode = exhibit.country + "-"  + exhibit.state 
        data.append({
            "stateCode":stateCode,
            "title":exhibit.title
        })
        dataJSON = dumps(data)
    return render(request,'main/indiaMap.html',{"artifactsData":dataJSON})

def indiaLobby(request,state_code):
    exhibition_entries = Exhibition_Entry.objects.all() # exhibition_entries_json = serializers.serialize('json', exhibition_entries)
    data = []
    for exhibit in exhibition_entries:
        exhibit_code = exhibit.country + '-' + exhibit.state
        if(exhibit_code == state_code):
            data.append({
                "title":exhibit.title,
                "username":exhibit.username,
                "slug":exhibit.slug,
                "modelLink":exhibit.model_link,
                "poster":exhibit.poster.url,
                "imageUrl":exhibit.exhibition_front_view.url,
                "modalInfo":exhibit.description,
                "youtubeUrl":exhibit.explanation_video_link,
                "reportUrl":exhibit.research_paper_link,
                "exhibit_model":exhibit.exhibit_model.url,
                "team_members":exhibit.team_members,
                "school_name":exhibit.school_name,
                "is_verified":exhibit.is_verified,
                "country":exhibit.country,
                "state":exhibit.state,
            })
    # print(data)
    # # dump data
    dataJSON = dumps(data)
    # print("json",dataJSON)
    return render( request,'main/indiaMuseum.html', context={"data":dataJSON})

def commonLobby(request):
    exhibition_entries = Exhibition_Entry.objects.all()
    data = []
    for exhibit in exhibition_entries:
         if(exhibit.is_verified):
            data.insert(0,{
                    "title":exhibit.title,
                    "username":exhibit.username,
                    "slug":exhibit.slug,
                    "modelLink":exhibit.model_link,
                    "poster":exhibit.poster.url,
                    "imageUrl":exhibit.exhibition_front_view.url,
                    "modalInfo":exhibit.description,
                    "youtubeUrl":exhibit.explanation_video_link,
                    "reportUrl":exhibit.research_paper_link,
                    "exhibit_model":exhibit.exhibit_model.url,
                    "team_members":exhibit.team_members,
                    "school_name":exhibit.school_name,
                    "is_verified":exhibit.is_verified,
                    "country":exhibit.country,
                    "state":exhibit.state,
                })
         else:
             data.append({
                    "title":exhibit.title,
                    "username":exhibit.username,
                    "slug":exhibit.slug,
                    "modelLink":exhibit.model_link,
                    "poster":exhibit.poster.url,
                    "imageUrl":exhibit.exhibition_front_view.url,
                    "modalInfo":exhibit.description,
                    "youtubeUrl":exhibit.explanation_video_link,
                    "reportUrl":exhibit.research_paper_link,
                    "exhibit_model":exhibit.exhibit_model.url,
                    "team_members":exhibit.team_members,
                    "school_name":exhibit.school_name,
                    "is_verified":exhibit.is_verified,
                    "country":exhibit.country,
                    "state":exhibit.state,
                })
    dataJSON=dumps(data)
    return render( request,'main/commonlobby.html', context={"data":dataJSON})

def model_page(request, pk):
    # Get a specific Exhibition_Entry object based on the provided slug
    Current_Exhibit = Exhibition_Entry.objects.get(slug=pk)
    # print("in model page:")
    # print(Current_Exhibit.__dict__)
    return render(request, 'main/modelPage.html', {'Exhibit': Current_Exhibit})


def loginPage(request):
    page = 'login'
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')
        try:
            user = User.objects.get(username=username)
            print(user)
            print(user.__dict__)
        except:
            messages.error(request,"Invalid User")
            

        user = authenticate(request,username=username, password=password)
        print(user)
        if user is not None:
            login(request,user)
            print("logged in")
            return redirect('home')
        else:
            messages.error(request,"username or password doesn't exist")
    context = {'page':page}
    return render(request,'main/login_register.html',context)

def logoutUser(request):
    # it will delete that token therefore deleting that user
    logout(request)
    print("user is logged out successfully")
    return redirect('home')

def registerUser(request):
    form = UserCreationForm()

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request,user)
            return redirect('home')
        else:
            messages.error(request,'An error occured during registration')

              
    return render(request,'main/login_register.html',{'form':form})

def edition(request,pk):
    print(pk,'edition is working')
    exhibition_entries = Exhibition_Entry.objects.all()
    data = []
    for exhibit in exhibition_entries:
         if(str(pk)==exhibit.edition):
            if(exhibit.is_verified ):
                data.insert(0,{
                        "title":exhibit.title,
                        "username":exhibit.username,
                        "slug":exhibit.slug,
                        "modelLink":exhibit.model_link,
                        "poster":exhibit.poster.url,
                        "imageUrl":exhibit.exhibition_front_view.url,
                        "modalInfo":exhibit.description,
                        "youtubeUrl":exhibit.explanation_video_link,
                        "reportUrl":exhibit.research_paper_link,
                        "exhibit_model":exhibit.exhibit_model.url,
                        "team_members":exhibit.team_members,
                        "school_name":exhibit.school_name,
                        "is_verified":exhibit.is_verified,
                        "country":exhibit.country,
                        "state":exhibit.state,
                        "edition":exhibit.edition
                    })
            else:
                data.append({
                        "title":exhibit.title,
                        "username":exhibit.username,
                        "slug":exhibit.slug,
                        "modelLink":exhibit.model_link,
                        "poster":exhibit.poster.url,
                        "imageUrl":exhibit.exhibition_front_view.url,
                        "modalInfo":exhibit.description,
                        "youtubeUrl":exhibit.explanation_video_link,
                        "reportUrl":exhibit.research_paper_link,
                        "exhibit_model":exhibit.exhibit_model.url,
                        "team_members":exhibit.team_members,
                        "school_name":exhibit.school_name,
                        "is_verified":exhibit.is_verified,
                        "country":exhibit.country,
                        "state":exhibit.state,
                        "edition":exhibit.edition
                    })
    # print(data)
    dataJSON=dumps(data)
    return render( request,'main/edition.html', context={"data":dataJSON})


def quiz(request):
    is_authenticated = request.user.is_authenticated  # Store the boolean value
   

  
    if(is_authenticated):
        questions = Question.objects.prefetch_related('choices').order_by('id')    
        print(questions)
        all_questions = []
        for question in questions:
            question_data = {
                'id':question.id,
                'question':question.question,
                'description':question.description,
                'image':question.image.url if question.image else None,
                'choices':[
                    {
                        'choice':choice.choice,
                        'is_correct':choice.is_correct
                    }
                    for choice in question.choices.all()
                ]
            }
            all_questions.append(question_data)
        # print(all_questions)
        questions=dumps(all_questions)
        print(questions)
        return render(request,'main/quiz.html',context={"questions":questions})
    else:
        return render(request,'main/quizAuth.html',{})
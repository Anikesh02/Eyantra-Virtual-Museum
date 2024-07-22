import uuid

from django.db import models
from django.utils.html import mark_safe
from django.utils.text import slugify

STATE_CHOICES = [
     ('JK', 'Jammu and Kashmir'),
        ('PB', 'Punjab'),
        ('MH', 'Maharashtra'),
        ('KA', 'Karnataka'),
        ('KL', 'Kerala'),
        ('TG', 'Telangana'),
        ('TN', 'Tamil Nadu'),
        ('MP', 'Madhya Pradesh'),
        ('AP','Andhra Pardesh'),
        ('AR','Arunachal Pardesh'),
        ('AS','Assam'),
        ('BR','Bihar'),
        ('CH','Chandigarh'),
        ('CT','Chattisgarh'),
        ('DL','Delhi'),
        ('GJ','Gujarat'),
        ('HP','Himachal Pardesh'),
        ('JH','Jharkhand'),
        ('JK','Jammmu & Kashmir'),
         ('RJ','Rajasthan'),
          ('UP','Uttar Pardesh'),
        ('BA', 'Bagmati'),
        ('JA', 'Janakpur'),
        ('34', 'Shemgang'),
        ("INOR", "Orissa") 

]

COUNTRY_CHOICES = [
        ("IN", "India"),
        ("NP", "Nepal"),
        ("BT", "Bhutan"),
    ]

EDITION_CHOICES = [
    ('1','Edition 1'),
    ('2','Edition 2'),
    ('3','Edition 3'),
    ('4','Edition 4'),
]

class Exhibition_Entry(models.Model):

    country = models.CharField(max_length=2, choices=COUNTRY_CHOICES, default="IN")
    state = models.CharField(max_length=20,choices=STATE_CHOICES,default="Maharashtra")
    # title of exhibition entry
    title = models.CharField(max_length=100)

    # edition of the artifact
    edition = models.CharField(max_length=2,choices=EDITION_CHOICES,default='1')
    # username of submission
    username = models.CharField(max_length=100)

    # unique slug for each entry
    slug = models.SlugField(max_length=40,editable=False)

    # model link to model.html template
    model_link =models.CharField(max_length=100,default='/model/')

    # poster
    poster = models.FileField(upload_to='uploads/Exhibition_front_view/',default='uploads/Exhibition_front_view/image6.jpg')

    # exhibition front view to display on lobby in frames
    exhibition_front_view =models.FileField(upload_to='uploads/Exhibition_front_view/',default='uploads/Exhibition_front_view/image6.jpg')

    description = models.TextField()

    # Explanation video with voiceover
    explanation_video_link = models.CharField(max_length=500,default='/')

    # research paper as link
    research_paper_link = models.CharField(max_length=500,default='/')

    # animation video to play for 3d view
    animation_video = models.FileField(upload_to='uploads/Animation_Video',default='uploads/Exhibition_front_view/image6.jpg')

    # model to display as orbital view
    exhibit_model = models.FileField(upload_to='uploads/Exhibition_Walls',default='uploads/Exhibition_front_view/image6.jpg')

    # team members separated by commas
    team_members = models.TextField()

    # school name of team members
    school_name = models.CharField(max_length=100,default='',blank=True)

    # if is_verified is true only then the entry is shown on lobby page
    is_verified = models.BooleanField(default=False)

    @property
    def front_view_preview(self):
        if self.exhibition_front_view:
            return mark_safe('<img src="{}" width="192" height="108" />'.format(self.exhibition_front_view.url))
        return ""

    def __str__(self):
         return self.title
    def save(self, *args, **kwargs):
        slug_link = self.title + " " +str(uuid.uuid4())
        self.slug = slugify(slug_link)
        self.model_link = "/model/" + self.slug
        super(Exhibition_Entry, self).save(*args, **kwargs)

class Question(models.Model):
    question = models.CharField(max_length=200)
    image = models.ImageField(upload_to='artifacts/', blank=True) 
    description = models.TextField(blank=True)  # New field for artifact description

class Choice(models.Model):
    question = models.ForeignKey("Question",related_name="choices",on_delete=models.CASCADE)
    choice = models.CharField("Choice",max_length=50)
    position = models.IntegerField("position")
    is_correct = models.BooleanField(default=False)
    class Meta:
        unique_together = [
            # no duplicate choice per question
            ("question","choice"),
            # no duplicate position per question
            ("question","position")
            ]
        ordering = ("position",) 

   




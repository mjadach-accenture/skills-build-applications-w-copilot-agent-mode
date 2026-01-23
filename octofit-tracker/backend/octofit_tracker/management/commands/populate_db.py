from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        # Create users
        tony = User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel, is_superhero=True)
        steve = User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel, is_superhero=True)
        bruce = User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc, is_superhero=True)
        clark = User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc, is_superhero=True)

        # Create workouts
        workout1 = Workout.objects.create(name='Super Strength', description='Strength workout')
        workout2 = Workout.objects.create(name='Flight Training', description='Flight workout')
        workout1.suggested_for.set([tony, steve, bruce, clark])
        workout2.suggested_for.set([clark])

        # Create activities
        Activity.objects.create(user=tony, type='Running', duration=30, date=date(2024, 1, 1))
        Activity.objects.create(user=steve, type='Swimming', duration=45, date=date(2024, 1, 2))
        Activity.objects.create(user=bruce, type='Cycling', duration=60, date=date(2024, 1, 3))
        Activity.objects.create(user=clark, type='Flying', duration=120, date=date(2024, 1, 4))

        # Create leaderboard
        Leaderboard.objects.create(user=tony, score=100)
        Leaderboard.objects.create(user=steve, score=90)
        Leaderboard.objects.create(user=bruce, score=95)
        Leaderboard.objects.create(user=clark, score=110)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))

from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTestCase(TestCase):
    def setUp(self):
        team = Team.objects.create(name='Marvel', description='Marvel superheroes')
        user = User.objects.create(email='tony@stark.com', name='Tony Stark', team=team, is_superhero=True)
        workout = Workout.objects.create(name='Super Strength', description='Strength workout')
        activity = Activity.objects.create(user=user, type='Running', duration=30, date='2024-01-01')
        Leaderboard.objects.create(user=user, score=100)

    def test_user(self):
        self.assertEqual(User.objects.count(), 1)

    def test_team(self):
        self.assertEqual(Team.objects.count(), 1)

    def test_activity(self):
        self.assertEqual(Activity.objects.count(), 1)

    def test_workout(self):
        self.assertEqual(Workout.objects.count(), 1)

    def test_leaderboard(self):
        self.assertEqual(Leaderboard.objects.count(), 1)

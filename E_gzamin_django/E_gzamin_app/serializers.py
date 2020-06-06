from rest_framework import serializers
from E_gzamin_app.models import *


class BaseEntitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BaseEntity
        fields = ['url', 'id', 'createdAt', 'removedAt']


class AnswerSerializer(BaseEntitySerializer):
    class Meta:
        model = Answer
        fields = BaseEntitySerializer.Meta.fields + ['content', 'isCorrect']


class CourseSerializer(BaseEntitySerializer):
    class Meta:
        model = Course
        fields = BaseEntitySerializer.Meta.fields + ['name']


class DesignateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Designate
        fields = ['time', 'startDate', 'endDate', 'passReq']


class GroupSerializer(BaseEntitySerializer):
    class Meta:
        model = Group
        fields = BaseEntitySerializer.Meta.fields + ['name', 'groupCode', 'openedAt', 'closedAt']


class QuestionSerializer(BaseEntitySerializer):
    class Meta:
        model = Question
        fields = BaseEntitySerializer.Meta.fields + ['content']

    def create(self, validated_data):
        question = Question.objects.create(user=current,**validated_data)
        return question

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        return instance


class QuestionTemplateSerializer(BaseEntitySerializer):
    class Meta:
        model = QuestionTemplate
        fields = BaseEntitySerializer.Meta.fields + ['questionsCount']


class TestResultSerializer(BaseEntitySerializer):
    class Meta:
        model = TestResult
        fields = BaseEntitySerializer.Meta.fields + ['result', 'maxPoints', 'isPassed',
                                                     'completedAt', 'startedAt', 'finishedAt']


class TestTemplateSerializer(BaseEntitySerializer):
    class Meta:
        model = TestTemplate
        fields = BaseEntitySerializer.Meta.fields + ['name']

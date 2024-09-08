from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import TraderIdea
from .serializers import TraderIdeaSerializer
from rest_framework.permissions import IsAuthenticated

class TraderIdeaViewSet(viewsets.ModelViewSet):
    queryset = TraderIdea.objects.all()
    serializer_class = TraderIdeaSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        serializer = self.get_serializer(data=request.data, files=request.FILES)

        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

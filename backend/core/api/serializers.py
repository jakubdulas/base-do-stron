from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# custom JWT
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # dodaje do tokenu nazwe uzytkownika
        token['username'] = user.username

        return token

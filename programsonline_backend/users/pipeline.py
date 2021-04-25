def add_extra_data_to_the_user(backend, details, response, user=None, *args, **kwargs):
    if backend.name == 'facebook':
        url = response.get('picture')
        if url:
            user.photo = url['data']['url']

    if backend.name == 'vk-oauth2':
        url = response.get('user_photo')
        if url:
            user.photo = url

    if backend.name == 'google-oauth2':
        url = response.get('picture')
        if url:
            user.photo = url

    if backend.name == 'yandex-oauth2':
        url = response.get('default_avatar_id')
        default_expression = '0/0-0'

        if url == default_expression:
            user.photo = "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-200"

        elif url:
            user.photo = url

    if backend.name == 'odnoklassniki-oauth2':
        url = response.get('pic_1')
        if url:
            user.photo = url

    if backend.name == 'mailru-oauth2':
        print(response)
        url = response.get('pic_190')
        if url:
            user.photo = url
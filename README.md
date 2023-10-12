# Управление заказами

## Запуск приложения

### Настройка Django REST API

1. Отключить в файле `settings.py` (back_for_test) middleware CSRF:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

2. Там же отключить аутентификацию по SessionAuthentication:

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],

    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
    ],

    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}
```

3. Сделать кастомную пагинацию в `views.py` (api):

```python
class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000


class WorkOrderViewSet(viewsets.ModelViewSet):
    queryset = WorkOrder.objects.select_related('material', 'product')
    serializer_class = WorkOrderReadSerializer
    pagination_class = CustomPagination
    ...
```

4. Там же отключить пагинацию:

```python
class NomenclatureViewSet(viewsets.ModelViewSet):
    queryset = Nomenclature.objects.all()
    serializer_class = NomenclatureSerializer
    pagination_class = None
    ...
```

### Запуск SPA приложения

1. `npm i`
2. `npm run app:start`

### В приложении реализовано

1. Авторизация.
2. Таблица с заказами-нарядами.
3. Поиск для таблицы заказов-нарядов.
4. Фильтрация по трём полям для таблицы заказов-нарядов.
5. Сортировка для таблицы заказов-нарядов.
6. CRUD заказов-нарядов.
7. Таблица произведенной продукции по конкретному заказу-наряду.
8. CRUD произведенной продукции.
9. Вывод на печать этикетки с произведенной продукцией.

# PPKWU
## Dokumentacja

Web API oferujące różne endpointy. Aplikacja została zaimplementowana w języku JavaScript, wykorzystuje bibliotekę Node.js oraz framework Express. Aplikacja domyślnie uruchamia się na localhoscie, na porcie 3004. App.js uruchamia aplikację.

### zad1

Endpoint odwraca i zwraca przesłany string z parametru. Po odwołaniu się do endpointa “/:rev”, aplikacja zwraca odwrócony string z parametru rev.

Przykład: “localhost/hello” zwróci string “olleh”

### zad2

Endpoint “/checkletters/:str” zwraca plik json z informacją o wystąpieniu małej, wielkiej i specjalnej liter z parametru str. 

Przykład: “localhost/checkletters/Hello” zwróci “{"lowerCase":true,"uppercase":true,"special":false}“

### zad3

Endpoint "/download/ics/:year/:month" pobiera wygenerowany plik ICS z wydarzeniami ze strony [WEEIA](http://www.weeia.p.lodz.pl/). Parametr year to rok, month to miesiąc.
W przypadku podania nieporawnej daty w paramtrach zwracany jest komunikat "Invalid number!".
Gdy generacja pliku ICS się nie powiedzie zwracany jest komunikat "ICS file generation error!".

Przykład: "http://localhost/download/ics/2019/11" zwróci plik w formacie ICS o zawartości 
```
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:adamgibbons/ics
METHOD:PUBLISH
X-PUBLISHED-TTL:PT1H
BEGIN:VEVENT
UID:c67dbfa8-4e06-46a0-9025-f29ebf982f89
SUMMARY:First Step to Fields Medal
DTSTAMP:20191119T015600Z
DTSTART;VALUE=DATE:20191104
END:VEVENT
BEGIN:VEVENT
UID:8699fce0-4e1a-4be3-8831-cd2cb4201ae6
SUMMARY:First Step to Success
DTSTAMP:20191119T015600Z
DTSTART;VALUE=DATE:20191106
END:VEVENT
BEGIN:VEVENT
UID:b7c21fa5-c08d-4396-88dc-b17be5ba44a8
SUMMARY:First Step to Nobel Prize
DTSTAMP:20191119T015600Z
DTSTART;VALUE=DATE:20191108
END:VEVENT
BEGIN:VEVENT
UID:60d15e0e-cb07-42f3-8540-fd455bddbcf5
SUMMARY:Fascynująca Fizyka - poziom podstawowy
DTSTAMP:20191119T015600Z
DTSTART;VALUE=DATE:20191115
END:VEVENT
END:VCALENDAR
```
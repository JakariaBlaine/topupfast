<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	You Are Not Admin <form method="POST" action="{{ route('logout') }}">
  @csrf
  <button type="submit">Logout</button>
</form>

</body>
</html>
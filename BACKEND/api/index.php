<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
require __DIR__ . '/../vendor/autoload.php';
 
const JWT_SECRET = "unSecret";

$app = AppFactory::create();

function createJwT (Response $response) : Response {
    $issuedAt = time();
    $expirationTime = $issuedAt + 60; // rajoute 60secondes
    $payload = array(
    'userid' => '1',
    'email' => 'contact@jordanbrisson.fr',
    'username' => 'LeSupaPoney',
    'iat' => $issuedAt,		//issue le
    'exp' => $expirationTime // expire le
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS512");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS512"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/client"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->get('/api/clients', function (Request $request, Response $response, $args) {   
    $response->getBody()->write(json_encode($response));

    return $response;
});


$app->post('/api/login', function (Request $request, Response $response, $args) {   
    $err=false;
    $inputJSON = file_get_contents('php://input');
    $body = json_decode( $inputJSON, TRUE );

    $login = $body ['login'] ?? "";
    $pass = $body ['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass))  {
        $err=true;
    }

    if (!$err) {
            $response = createJwT ($response);
            $response = addHeaders($response);
            $data = array('login' => $login, 'password' => $pass);
            $response->getBody()->write(json_encode($data));
     } else {          
            $response = $response->withStatus(401);
     }
    return $response;
});

$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();
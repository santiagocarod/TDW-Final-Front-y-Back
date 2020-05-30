<?php

// Define app routes

use TDW\ACiencia\Controller\LoginController;
use Slim\App;

return function (App $app) {

    // Redirection / -> /api-docs/index.html
    $app->redirect(
        '/',
        '/proyecto/index.html'
    )->setName('tdw_home_redirect');

    
    $app->redirect('/proyecto','/proyecto/index.html')->setName('proyecto_index');
    /**
     * ############################################################
     * routes /login
     * POST /login
     * ############################################################
     */
    $app->post(
        $_ENV['RUTA_LOGIN'],
        LoginController::class . ':post'
    )->setName('tdw_post_login');
};

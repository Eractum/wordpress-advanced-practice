<?php

function up_rest_api_signin_handler($request) {
    $response = ['status' => 1];
    $params = $request->get_json_params();

    if (!isset($params['login'], $params['password']) ||
        empty($params['login']) ||
        empty($params['password'])
    ) {
        return $response;
    }

    $login = sanitize_email($params['login']);
    $password = sanitize_text_field($params['password']);

    $user = wp_signon([
        'user_login' => $login,
        'user_password' => $password,
        'remember' => true
    ]);

    if(is_wp_error($user)) {
        return $response;
    }

    $response['status'] = 2;
    return $response;
}
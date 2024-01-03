<?php

function up_header_tools_render_cb($atts) {
    $showAuth = esc_attr($atts['showAuth']);
    $isLogged = is_user_logged_in();
    $user = wp_get_current_user();
    $openClass = !$isLogged ? 'open-modal' : '';
    $link = !$isLogged ? '#' : '#';
    $username = !$isLogged ? 'Sign In' : esc_html($user->user_login);

    ob_start();
    ?>
    <div class="wp-block-phishsticks-plus-header-tools">
        <?php
        if ($showAuth) {
        ?>
        <a class="signin-link <?php echo $openClass ?>" href="<?php echo $link; ?>">
            <div class="signin-icon">
                <i class="bi bi-person-circle"></i>
            </div>
            <div class="signin-text">
                <small>Hello, <?php echo $username ?></small>
                My Account
            </div>
        </a>
        <?php
        }
        ?>
    </div>
    <?php
    $output = ob_get_contents();
    ob_end_clean();

    return $output;
}
<?php

function up_plugin_options_alt_page() {
    ?>
    <div class="wrap">
        <form method="POST" actions="options.php">
            <?php
            settings_fields('up_options_group');
            do_settings_sections('up-options-page');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}
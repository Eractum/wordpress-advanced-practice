<?php
/* This will not be loaded as long as templates exist */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class('example'); ?>>
<?php wp_body_open(); ?>

<p>Hello world!</p>

<?php wp_footer(); ?>
</body>
</html>
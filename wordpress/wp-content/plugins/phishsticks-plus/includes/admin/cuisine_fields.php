<?php

function up_cuisine_add_form_fields() {
    ?>
    <div class="form-field term-name-wrap">
        <label for="up_more_info_url"><?php _e('More Info URL', 'phishsticks-plus'); ?></label>
        <input name="up_more_info_url" id="up_more_info_url" type="text" value="" size="40" aria-describedby="up_more_info_url_description" />
        <p id="up_more_info_url_description"><?php _e('A URL a user can click to learn more information about the cuisine', 'phishsticks-plus'); ?></p>
    </div>
    <?php
}

function up_cuisine_edit_form_fields($term) {
    $url = get_term_meta(
        $term->term_id,
        'more_info_url',
        true
    )

    ?>
    <tr class="form-field term-name-wrap">
        <th scope="row"><label for="up_more_info_url"><?php _e('More Info URL', 'phishsticks-plus'); ?></label></th>
        <td>
            <input name="up_more_info_url" id="up_more_info_url" type="text" size="40" aria-describedby="up_more_info_url_description"
                value="<?php echo $url; ?>"
            />
            <p class="description" id="up_more_info_url_description"><?php _e('A URL a user can click to learn more information about the cuisine', 'phishsticks-plus'); ?></p>
        </td>
    </tr>
    <?php
}
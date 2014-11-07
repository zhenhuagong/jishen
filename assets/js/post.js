/**
 * JS file for post behaviours
 */

// Get related posts
$('.related-posts').ghostRelated({
    titleClass: '.related-post-title',
    tagsClass: '.related-post-tags',
    limit: 3,
    debug: false
});
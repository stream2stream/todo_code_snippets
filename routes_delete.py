    app.add_url_rule('/api/post/<int:post_id>', 'delete_post', delete_post, methods=['DELETE'])

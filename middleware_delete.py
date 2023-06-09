def delete_post(post_id):
    try:
        if DATA_PROVIDER.delete_post(post_id):
            return make_response("", 200)
        else:
            return make_response("", 404)
    except ValueError as err:
        err_response = make_response("", 500)
        return err_response
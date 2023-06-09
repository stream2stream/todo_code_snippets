    # Delete a blog post
    def delete_post(self, post_id):
        if int(post_id) < 0:
            raise ValueError("Parameter [id] should be a positive number!")

        if post_id > 0:
            sql = """delete from post where id = %s"""
            input_values = (post_id,)

            try:
                self.cursor.execute(sql, input_values)
                self.conn.commit()
            except pymysql.Error as exc:
                self.conn.rollback()

            return True

        return False
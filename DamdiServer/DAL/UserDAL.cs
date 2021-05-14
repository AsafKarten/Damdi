using DamdiServer.Models;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class UserDAL
    {
        private readonly string conStr;
        public UserDAL(string conStr)
        {
            this.conStr = conStr;
        }

        /*Get user from database*/
        public User GetUser(string personal_id, string pass)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    User u = null;
                    string query = $"SELECT * FROM dbo.Users where personal_id = @personal_id AND pass = @pass";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@personal_id", personal_id);
                    cmd.Parameters.AddWithValue("@pass", pass);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        u = new User(Convert.ToString(reader["personal_id"]), Convert.ToString(reader["email"]));
                    }
                    return u;
                }
            }
            catch (Exception)
            {
                throw new Exception("User was not found in the table");
            }

        }

        /*Create a new user in users table*/
        public int SetNewUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    string query = "INSERT INTO dbo.Users (personal_id,email,pass) VALUES (@Personal_id,@Email,@Pass)";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Personal_id", SqlDbType.NVarChar).Value = user.Personal_id; //u.Personal_id
                    cmd.Parameters.AddWithValue("@Email", SqlDbType.NVarChar).Value = user.Email; //u.Email
                    cmd.Parameters.AddWithValue("@Pass", SqlDbType.NVarChar).Value = user.Pass;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception)
            {
                throw new Exception("No row effected");
            }
        }
    }
}
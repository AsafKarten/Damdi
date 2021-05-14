using DamdiServer.Models;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class UserDAL
    {
        private readonly string conStr = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;

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

        /*Save new user in database*/
        public void SetNewUser(User u)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    string query = $"INSERT INTO Users (Personal_id, Email, Pass) Values ('@Personal_id, @Email, @Pass')";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Personal_id", SqlDbType.NVarChar).Value = u.GetPersonalId(); //u.Personal_id
                    cmd.Parameters.AddWithValue("@Email", SqlDbType.NVarChar).Value = u.GetEmail(); //u.Email
                    cmd.Parameters.AddWithValue("@Pass", SqlDbType.NVarChar).Value = u.GetPass();
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception)
            {
                throw new Exception("No row effected");
            }
        }
    }
}
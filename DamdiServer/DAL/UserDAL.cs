using DamdiServer.Models;
using System;
using System.Configuration;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class UserDAL
    {
        public SqlConnection connect()
        {
            //from Web.Config
            string ConStr = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;
            SqlConnection con = new SqlConnection(ConStr);
            con.Open();
            return con;
        }

        /*Get user from database*/
        public User GetUser(int user_number)
        {
            User u = null;
            SqlConnection con = connect();
            string query = $"select * from dbo.Users where user_number = @user_number";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.Parameters.AddWithValue("@user_number", user_number);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                u = new User(Convert.ToInt16(reader["user_number"]), Convert.ToString(reader["personal_id"]), Convert.ToString(reader["email"]));
            }
            return u;
        }

        /*Save new user in database*/
        public User SetNewUser(User u)
        {
            
            SqlConnection con = connect();
            string query = $"INSERT INTO Users (Personal_id, Email, Pass) Values ('@Personal_id, @Email, @Pass')";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.Parameters.AddWithValue("@Personal_id", u.Personal_id);
            cmd.Parameters.AddWithValue("@Email", u.Email);
            cmd.Parameters.AddWithValue("@Pass", u.Pass);
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i == 0)
            {
                throw new Exception("No row effected");
            }
            return u;
        }


    }
}
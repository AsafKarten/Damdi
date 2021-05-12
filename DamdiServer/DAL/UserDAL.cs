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
    }
}
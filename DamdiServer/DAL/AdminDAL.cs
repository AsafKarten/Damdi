using DamdiServer.Models;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class AdminDAL
    {
        private readonly string conStr;
        public AdminDAL(string conStr)
        {
            this.conStr = conStr;
        }
        public Admin GetAdmin(Admin admin)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    Admin A = null;
                    SqlCommand cmd = new SqlCommand("GetAdmin", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", admin.Personal_id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        A = new Admin(
                            Convert.ToInt32(reader["auto_worker_id"]),
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["first_name"]),
                            Convert.ToString(reader["last_name"]),
                            Convert.ToString(reader["salted_hash"]),
                            Convert.ToInt32(reader["Access_level"])
                            );
                    }
                    return A;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        //public int DeleteUser(object user)
        //{
            
        //}
    }
}
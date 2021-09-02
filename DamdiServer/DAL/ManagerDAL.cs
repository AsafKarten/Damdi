using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class ManagerDAL
    {
        private readonly string conStr;
        public ManagerDAL(string conStr)
        {
            this.conStr = conStr;
        }
        public Manager GetManager(string personal_id, string salted_hash)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    Manager m = null;
                    SqlCommand cmd = new SqlCommand("GetUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", personal_id);
                    cmd.Parameters.AddWithValue("@salted_hash", salted_hash);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        m = new Manager(
                            Convert.ToInt32(reader["auto_worker_id"]),
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["first_name"]),
                            Convert.ToString(reader["last_name"]),
                            Convert.ToString(reader["salted_hash"]),
                            Convert.ToInt32(reader["Access_level"])
                            );
                    }
                    return m;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
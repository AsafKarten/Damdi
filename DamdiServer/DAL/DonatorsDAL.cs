using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class DonatorsDAL
    {
        private readonly string conStr;
        public DonatorsDAL(string conStr)
        {
            this.conStr = conStr;
        }
        /*Create a new donator in Donators table*/
        public int SetNewDonator(Donators donator)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewDonator", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id_worker", SqlDbType.NVarChar).Value = donator.Personal_id_worker;
                    cmd.Parameters.AddWithValue("@first_name", SqlDbType.NVarChar).Value = donator.First_name; 
                    cmd.Parameters.AddWithValue("@last_name", SqlDbType.NVarChar).Value = donator.Last_name;
                    cmd.Parameters.AddWithValue("@salted_hash", SqlDbType.NVarChar).Value = donator.Salted_hash;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
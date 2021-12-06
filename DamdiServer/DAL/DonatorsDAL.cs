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

        public Donators GetDonator(Donators donator)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    Donators d = null;
                    SqlCommand cmd = new SqlCommand("GetDonator", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", donator.Personal_id_worker);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        d = new Donators(Convert.ToInt32(reader["personal_id_worker"]), Convert.ToString(reader["personal_id_worker"]), Convert.ToString(reader["first_name"]), Convert.ToString(reader["last_name"]), Convert.ToString(reader["salted_hash"]));
                    }
                    return d;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
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

        //Add questioner name and code questioner to first position  
        public int SetNewQuestiner(Donators donator)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewQuestiner", con);
                    string fullNameDonator = donator.First_name + " " + donator.Last_name;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@questioner_name", SqlDbType.NVarChar).Value = fullNameDonator;
                    cmd.Parameters.AddWithValue("@code_questioner", SqlDbType.Int).Value = donator.Auto_worker_id;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Add checker name hemoglobin, code hemoglobin, blood pressure and pulse to second position  
        public int SetNewInfoHemoglobin(MedicalInfoDonator med)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("UpdateNewInfoHemoglobin", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@code_questioner", SqlDbType.Int).Value = med.Code_questioner;
                    cmd.Parameters.AddWithValue("@checker_hemo", SqlDbType.NVarChar).Value = med.Checker_hemog;
                    cmd.Parameters.AddWithValue("@code_hemo", SqlDbType.Int).Value = med.Code_hemog;
                    cmd.Parameters.AddWithValue("@blood_pressure", SqlDbType.Int).Value = med.Code_hemog;
                    cmd.Parameters.AddWithValue("@pulse", SqlDbType.Int).Value = med.Code_hemog;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //TODO: Continew to insert the rest of the data to MedicalInfoDonator table 
        public int SetNewRestInfoDonator(MedicalInfoDonator med)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("UpdateNewRestInfoDonator", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@code_questioner", SqlDbType.Int).Value = med.Code_questioner;
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
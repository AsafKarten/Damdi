using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace DamdiServer.DAL
{
    public class MedicalInfoDAL
    {
        private readonly string conStr;

        public MedicalInfoDAL(string conStr)
        {
            this.conStr = conStr;
        }

        /*Get medical user info from database - Not working well object */
        public MedicalInfoDonation GetMedicalInfo(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    MedicalInfoDonation mid = null;
                    SqlCommand cmd = new SqlCommand("GetMedicalInfoUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", user.Personal_id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (!reader.Read())
                    {
                        return null;
                    }
                    while (reader.Read())
                    {
                        mid = new MedicalInfoDonation(
                            Convert.ToInt32(reader["mi_donation_from"]),
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToDateTime(reader["answer_date"]),
                            Convert.ToBoolean(reader["Q3_1"]),
                            Convert.ToBoolean(reader["Q3_2"]),
                            Convert.ToBoolean(reader["Q3_3"]),
                            Convert.ToBoolean(reader["Q3_4"]),
                            Convert.ToBoolean(reader["Q3_5"]),
                            Convert.ToBoolean(reader["Q3_6"]),
                            Convert.ToBoolean(reader["Q3_7"]),
                            Convert.ToBoolean(reader["Q3_8"]),
                            Convert.ToBoolean(reader["Q3_9"]),
                            Convert.ToBoolean(reader["Q3_10"]),
                            Convert.ToBoolean(reader["Q3_11"]),
                            Convert.ToBoolean(reader["Q3_12"]),
                            Convert.ToBoolean(reader["Q3_13"]),
                            Convert.ToBoolean(reader["Q3_14"]),
                            Convert.ToBoolean(reader["Q3_15"]),
                            Convert.ToBoolean(reader["Q3_16"]),
                            Convert.ToBoolean(reader["Q3_17"]),
                            Convert.ToBoolean(reader["Q3_18"]),
                            Convert.ToBoolean(reader["Q3_19"]),
                            Convert.ToBoolean(reader["Q3_20"]),
                            Convert.ToBoolean(reader["Q3_21"]),
                            Convert.ToString(reader["notes"])
                            );
                    }
                    return mid;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int SetNewMedicalInfo(MedicalInfoDonation mid)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewMedicalInfo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = mid.Personal_id;
                    cmd.Parameters.AddWithValue("@answer_date", SqlDbType.Date).Value = mid.Answer_date;
                    cmd.Parameters.AddWithValue("@q3_1", SqlDbType.Bit).Value = mid.Q3_1;
                    cmd.Parameters.AddWithValue("@q3_2", SqlDbType.Bit).Value = mid.Q3_2;
                    cmd.Parameters.AddWithValue("@q3_3", SqlDbType.Bit).Value = mid.Q3_3;
                    cmd.Parameters.AddWithValue("@q3_4", SqlDbType.Bit).Value = mid.Q3_4;
                    cmd.Parameters.AddWithValue("@q3_5", SqlDbType.Bit).Value = mid.Q3_5;
                    cmd.Parameters.AddWithValue("@q3_6", SqlDbType.Bit).Value = mid.Q3_6;
                    cmd.Parameters.AddWithValue("@q3_7", SqlDbType.Bit).Value = mid.Q3_7;
                    cmd.Parameters.AddWithValue("@q3_8", SqlDbType.Bit).Value = mid.Q3_8;
                    cmd.Parameters.AddWithValue("@q3_9", SqlDbType.Bit).Value = mid.Q3_9;
                    cmd.Parameters.AddWithValue("@q3_10", SqlDbType.Bit).Value = mid.Q3_10;
                    cmd.Parameters.AddWithValue("@q3_11", SqlDbType.Bit).Value = mid.Q3_11;
                    cmd.Parameters.AddWithValue("@q3_12", SqlDbType.Bit).Value = mid.Q3_12;
                    cmd.Parameters.AddWithValue("@q3_13", SqlDbType.Bit).Value = mid.Q3_13;
                    cmd.Parameters.AddWithValue("@q3_14", SqlDbType.Bit).Value = mid.Q3_14;
                    cmd.Parameters.AddWithValue("@q3_15", SqlDbType.Bit).Value = mid.Q3_15;
                    cmd.Parameters.AddWithValue("@q3_16", SqlDbType.Bit).Value = mid.Q3_16;
                    cmd.Parameters.AddWithValue("@q3_17", SqlDbType.Bit).Value = mid.Q3_17;
                    cmd.Parameters.AddWithValue("@q3_18", SqlDbType.Bit).Value = mid.Q3_18;
                    cmd.Parameters.AddWithValue("@q3_19", SqlDbType.Bit).Value = mid.Q3_19;
                    cmd.Parameters.AddWithValue("@q3_20", SqlDbType.Bit).Value = mid.Q3_20;
                    cmd.Parameters.AddWithValue("@q3_21", SqlDbType.Bit).Value = mid.Q3_21;
                    cmd.Parameters.AddWithValue("@notes", SqlDbType.NVarChar).Value = mid.Notes;
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
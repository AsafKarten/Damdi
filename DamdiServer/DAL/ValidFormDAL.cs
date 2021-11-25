using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DamdiServer.DAL
{
    public class ValidFormDAL
    {
        private readonly string conStr;

        public ValidFormDAL(string conStr)
        {
            this.conStr = conStr;
        }



        public int SetNewValidForm(ValidForm validForm)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewValidInfo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = validForm.Personal_id;
                    cmd.Parameters.AddWithValue("@form_date", SqlDbType.Date).Value = validForm.DateForm;
                    cmd.Parameters.AddWithValue("@valid_1", SqlDbType.Bit).Value = validForm.Valid1;
                    cmd.Parameters.AddWithValue("@valid_2", SqlDbType.Bit).Value = validForm.Valid2;
                    cmd.Parameters.AddWithValue("@valid_3", SqlDbType.Bit).Value = validForm.Valid3;
                    cmd.Parameters.AddWithValue("@valid_4", SqlDbType.Bit).Value = validForm.Valid4;
                    cmd.Parameters.AddWithValue("@valid_5", SqlDbType.Bit).Value = validForm.Valid5;
                    cmd.Parameters.AddWithValue("@valid_6", SqlDbType.Bit).Value = validForm.Valid6;
                    cmd.Parameters.AddWithValue("@notes", SqlDbType.NVarChar).Value = validForm.Note;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ValidForm GetValidForm(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    ValidForm valid = null;
                    SqlCommand cmd = new SqlCommand("GetValidInfoUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", user.Personal_id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (!reader.Read())
                    {
                        return null;
                    }
                    while (reader.Read())
                    {
                        valid = new ValidForm(
                            Convert.ToInt32(reader["id_form"]),
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["form_date"]),
                            Convert.ToBoolean(reader["valid_1"]),
                            Convert.ToBoolean(reader["valid_2"]),
                            Convert.ToBoolean(reader["valid_3"]),
                            Convert.ToBoolean(reader["valid_4"]),
                            Convert.ToBoolean(reader["valid_5"]),
                            Convert.ToBoolean(reader["valid_6"]),
                            Convert.ToString(reader["notes"])
                            );
                    }
                    return valid;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
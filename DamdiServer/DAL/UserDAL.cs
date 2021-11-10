using DamdiServer.Models;
using System;
using System.Collections.Generic;
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
        public User GetUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    User u = null;
                    SqlCommand cmd = new SqlCommand("GetUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", user.Personal_id);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        u = new User(Convert.ToString(reader["personal_id"]), Convert.ToString(reader["email"]), Convert.ToString(reader["salted_hash"]));
                    }
                    return u;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        /*Get user info from database*/
        public User GetUserInfo(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    User ui = null;
                    SqlCommand cmd = new SqlCommand("GetUserInfo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", SqlDbType.NVarChar).Value = user.Personal_id;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        ui = new User(
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["first_name"]),
                            Convert.ToString(reader["last_name"]),
                            Convert.ToString(reader["phone"]),
                            Convert.ToString(reader["email"]),
                            Convert.ToString(reader["salted_hash"]),
                            Convert.ToString(reader["gender"]),
                            Convert.ToString(reader["birthdate"]),
                            Convert.ToString(reader["profile_img"]),
                            Convert.ToString(reader["prev_first_name"]),
                            Convert.ToString(reader["prev_last_name"]),
                            Convert.ToString(reader["city"]),
                            Convert.ToString(reader["address"]),
                            Convert.ToString(reader["postal_code"]),
                            Convert.ToString(reader["mail_box"]),
                            Convert.ToString(reader["telephone"]),
                            Convert.ToString(reader["work_telephone"]),
                            Convert.ToBoolean(reader["blood_group_member"]),
                            Convert.ToBoolean(reader["personal_insurance"]),
                            Convert.ToBoolean(reader["confirm_examination"]),
                            Convert.ToBoolean(reader["agree_future_don"]),
                            Convert.ToString(reader["birth_land"]),
                            Convert.ToString(reader["aliya_year"]),
                            Convert.ToString(reader["father_birth_land"]),
                            Convert.ToString(reader["mother_birth_land"]),
                            Convert.ToString(reader["blood_type"])
                            );
                    }
                    return ui;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int UpdateUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("UpdateUserDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id_user", SqlDbType.NVarChar).Value = user.Personal_id;
                    cmd.Parameters.AddWithValue("@email", SqlDbType.NVarChar).Value = user.Email;
                    cmd.Parameters.AddWithValue("@salted_hash", SqlDbType.Int).Value = user.Salted_hash;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
                    SqlCommand cmd = new SqlCommand("InsertNewUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = user.Personal_id;
                    cmd.Parameters.AddWithValue("@email", SqlDbType.NVarChar).Value = user.Email;
                    cmd.Parameters.AddWithValue("@salted_hash", SqlDbType.NVarChar).Value = user.Salted_hash;
                    cmd.Parameters.AddWithValue("@profile_img", SqlDbType.NVarChar).Value = user.Profile_img;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        /*Create a new user info in donorsinfo table*/
        public int SetNewUserInfo(User ui)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("UpdateUserInfoDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = ui.Personal_id;
                    cmd.Parameters.AddWithValue("@first_name", SqlDbType.NVarChar).Value = ui.First_name;
                    cmd.Parameters.AddWithValue("@last_name", SqlDbType.NVarChar).Value = ui.Last_name;
                    cmd.Parameters.AddWithValue("@phone", SqlDbType.NVarChar).Value = ui.Phone;
                    cmd.Parameters.AddWithValue("@gender", SqlDbType.NVarChar).Value = ui.Gender;
                    cmd.Parameters.AddWithValue("@birthdate", SqlDbType.DateTime).Value = Convert.ToDateTime(ui.Birthdate);
                    cmd.Parameters.AddWithValue("@prev_first_name", SqlDbType.NVarChar).Value = ui.Prev_first_name;
                    cmd.Parameters.AddWithValue("@prev_last_name", SqlDbType.NVarChar).Value = ui.Prev_last_name;
                    cmd.Parameters.AddWithValue("@city", SqlDbType.NVarChar).Value = ui.City;
                    cmd.Parameters.AddWithValue("@address", SqlDbType.NVarChar).Value = ui.Address;
                    cmd.Parameters.AddWithValue("@postal_code", SqlDbType.NVarChar).Value = ui.Postal_code;
                    cmd.Parameters.AddWithValue("@mail_box", SqlDbType.NVarChar).Value = ui.Mail_box;
                    cmd.Parameters.AddWithValue("@telephone", SqlDbType.NVarChar).Value = ui.Telephone;
                    cmd.Parameters.AddWithValue("@work_telephone", SqlDbType.NVarChar).Value = ui.Work_telephone;
                    cmd.Parameters.AddWithValue("@blood_group_member", SqlDbType.Bit).Value = ui.Blood_group_member;
                    cmd.Parameters.AddWithValue("@personal_insurance", SqlDbType.Bit).Value = ui.Personal_insurance;
                    cmd.Parameters.AddWithValue("@confirm_examination", SqlDbType.Bit).Value = ui.Confirm_examination;
                    cmd.Parameters.AddWithValue("@agree_future_don", SqlDbType.Bit).Value = ui.Agree_future_don;
                    cmd.Parameters.AddWithValue("@birth_land", SqlDbType.NVarChar).Value = ui.Birth_land;
                    cmd.Parameters.AddWithValue("@aliya_year", SqlDbType.NVarChar).Value = ui.Aliya_year;
                    cmd.Parameters.AddWithValue("@father_birth_land", SqlDbType.NVarChar).Value = ui.Father_birth_land;
                    cmd.Parameters.AddWithValue("@mother_birth_land", SqlDbType.NVarChar).Value = ui.Mother_birth_land;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*Get medical user info from database - Not working well object */
        public List<MedicalInfoDonation> GetMedicalInfo(string personal_id)
        {

            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    List<MedicalInfoDonation> medicalInfos = new List<MedicalInfoDonation>();
                    MedicalInfoDonation mid = null;
                    SqlCommand cmd = new SqlCommand("MedicalInfoUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", personal_id);
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
                            ); ;
                        medicalInfos.Add(mid);
                    }
                    return medicalInfos;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int SaveNewProfilePhotoToDB(string path, string id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("UpdateProfileImage", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@user_img", SqlDbType.NVarChar).Value = path;
                    cmd.Parameters.AddWithValue("@id", SqlDbType.NVarChar).Value = id;
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
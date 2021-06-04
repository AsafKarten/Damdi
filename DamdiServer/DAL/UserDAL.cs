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
        public User GetUser(string personal_id, string pass)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    User u = null;
                    string query = $"SELECT * FROM Users where personal_id = @personal_id AND pass = @pass";
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
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        /*Get user info from database*/
        public User GetUserInfo(string personal_id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    User ui = null;
                    string query = $"SELECT * FROM Users where personal_id=@Personal_id";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Personal_id", personal_id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        ui = new User(Convert.ToString(reader["personal_id"]),
                            Convert.ToString(reader["first_name"]),
                            Convert.ToString(reader["last_name"]),
                            Convert.ToString(reader["phone"]),
                            Convert.ToString(reader["gender"]),
                            Convert.ToString(reader["birthdate"]),
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
                            Convert.ToString(reader["mother_birth_land"])
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
        public int UpdateUserImage(string image, string user_id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    string query = "Update Users SET profile_img = @profile_img where personal_id=@personal_id";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = user_id; //u.Personal_id
                    cmd.Parameters.AddWithValue("@profile_img", SqlDbType.NVarChar).Value = image; //u.Email
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception)
            {

                throw;
            }
        } 

        /*Create a new user in users table fgfg*/
        public int SetNewUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    string query = "INSERT INTO Users (personal_id,email,pass) VALUES (@Personal_id,@Email,@Pass)";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Personal_id", SqlDbType.NVarChar).Value = user.Personal_id; //u.Personal_id
                    cmd.Parameters.AddWithValue("@Email", SqlDbType.NVarChar).Value = user.Email; //u.Email
                    cmd.Parameters.AddWithValue("@Pass", SqlDbType.NVarChar).Value = user.Pass;
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
                    string query = 
                        "Update Users SET " +
                        "first_name=@First_name," +
                        "last_name=@Last_name," +
                        "phone=@Phone," +
                        "gender=@Gender," +
                        "birthdate=@Birthdate," +
                        "prev_first_name=@Prev_first_name," +
                        "prev_last_name=@Prev_last_name," +
                        "city=@City," +
                        "address=@Address," +
                        "postal_code=@Postal_code," +
                        "mail_box=@Mail_box," +
                        "telephone=@Telephone," +
                        "work_telephone=@Work_telephone," +
                        "blood_group_member=@Blood_group_member," +
                        "personal_insurance=@Personal_insurance," +
                        "confirm_examination=@Confirm_examination," +
                        "agree_future_don=@Agree_future_don," +
                        "birth_land=@Birth_land," +
                        "aliya_year=@Aliya_year," +
                        "father_birth_land=@Father_birth_land," +
                        "mother_birth_land=@Mother_birth_land " +
                        "WHERE personal_id=@Personal_id";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Personal_id", SqlDbType.NVarChar).Value = ui.Personal_id;
                    cmd.Parameters.AddWithValue("@First_name", SqlDbType.NVarChar).Value = ui.First_name;
                    cmd.Parameters.AddWithValue("@Last_name", SqlDbType.NVarChar).Value = ui.Last_name;
                    cmd.Parameters.AddWithValue("@Phone", SqlDbType.NVarChar).Value = ui.Phone;
                    cmd.Parameters.AddWithValue("@Gender", SqlDbType.NVarChar).Value = ui.Gender;
                    cmd.Parameters.AddWithValue("@Birthdate", SqlDbType.Date).Value = Convert.ToDateTime(ui.Birthdate);
                    cmd.Parameters.AddWithValue("@Prev_first_name", SqlDbType.NVarChar).Value = ui.Prev_first_name;
                    cmd.Parameters.AddWithValue("@Prev_last_name", SqlDbType.NVarChar).Value = ui.Prev_last_name;
                    cmd.Parameters.AddWithValue("@City", SqlDbType.NVarChar).Value = ui.City;
                    cmd.Parameters.AddWithValue("@Address", SqlDbType.NVarChar).Value = ui.Address;
                    cmd.Parameters.AddWithValue("@Postal_code", SqlDbType.NVarChar).Value = ui.Postal_code;
                    cmd.Parameters.AddWithValue("@Mail_box", SqlDbType.NVarChar).Value = ui.Mail_box;
                    cmd.Parameters.AddWithValue("@Telephone", SqlDbType.NVarChar).Value = ui.Telephone;
                    cmd.Parameters.AddWithValue("@Work_telephone", SqlDbType.NVarChar).Value = ui.Work_telephone;
                    cmd.Parameters.AddWithValue("@Blood_group_member", SqlDbType.Bit).Value = ui.Blood_group_member;
                    cmd.Parameters.AddWithValue("@Personal_insurance", SqlDbType.Bit).Value = ui.Personal_insurance;
                    cmd.Parameters.AddWithValue("@Confirm_examination", SqlDbType.Bit).Value = ui.Confirm_examination;
                    cmd.Parameters.AddWithValue("@Agree_future_don", SqlDbType.Bit).Value = ui.Agree_future_don;
                    cmd.Parameters.AddWithValue("@Birth_land", SqlDbType.NVarChar).Value = ui.Birth_land;
                    cmd.Parameters.AddWithValue("@Aliya_year", SqlDbType.NVarChar).Value = ui.Aliya_year;
                    cmd.Parameters.AddWithValue("@Father_birth_land", SqlDbType.NVarChar).Value = ui.Father_birth_land;
                    cmd.Parameters.AddWithValue("@Mother_birth_land", SqlDbType.NVarChar).Value = ui.Mother_birth_land;
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
                    string query = $"SELECT * FROM MedicalInfoDonation where personal_id=@personal_id";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@personal_id", personal_id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (!reader.Read())
                    {
                        return null;
                    }

                    while (reader.Read())
                    {
                        mid = new MedicalInfoDonation(
                            Convert.ToString(reader["personal_id"]),
                            Convert.ToInt32(reader["client_qus_code"]),
                            Convert.ToInt32(reader["client_ans_code"]),
                            Convert.ToString(reader["answer_date"])
                            );
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
    }
}
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
                        d = new Donators(
                            Convert.ToInt32(reader["auto_worker_id"]),
                            Convert.ToString(reader["personal_id_worker"]),
                            Convert.ToString(reader["type_employee"]),
                            Convert.ToString(reader["first_name"]),
                            Convert.ToString(reader["last_name"]),
                            Convert.ToString(reader["salted_hash"])
                            );
                    }
                    return d;
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Donators> GetDonatorsList()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    var donators = new List<Donators>();
                    Donators donator = null;
                    SqlCommand cmd = new SqlCommand("GetAllDonators", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        donator = new Donators(
                           Convert.ToInt32(reader["personal_id_worker"]),
                           Convert.ToString(reader["personal_id_worker"]),
                           Convert.ToString(reader["type_employee"]),
                           Convert.ToString(reader["first_name"]),
                           Convert.ToString(reader["last_name"]),
                           Convert.ToString(reader["salted_hash"])
                           );
                        donators.Add(donator);
                    }
                    return donators;
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

        public int SetDataConfirmOne(MedicalInfoDonator donator)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertDataDonatorUnitOne", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@questioner_name", SqlDbType.NVarChar).Value = donator.Questioner_name;
                    cmd.Parameters.AddWithValue("@code_questioner", SqlDbType.Int).Value = donator.Code_questioner;
                    cmd.Parameters.AddWithValue("@notes_unit_one", SqlDbType.NVarChar).Value = donator.Notes_unit_one;
                    cmd.Parameters.AddWithValue("@app_id", SqlDbType.Int).Value = donator.App_id;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int SetConfirmTwoTrue(Appointments App)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SetConfirmTwoTrue", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = App.Personal_id;
                    cmd.Parameters.AddWithValue("@confirm_2", SqlDbType.Bit).Value = true;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int SetConfirmOneTrue(Appointments App)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SetConfirmOneTrue", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = App.Personal_id;
                    cmd.Parameters.AddWithValue("@confirm_1", SqlDbType.Bit).Value = true;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int SetConfirmThreeTrue(Appointments App)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SetConfirmTwoTrue", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personal_id", SqlDbType.NVarChar).Value = App.Personal_id;
                    cmd.Parameters.AddWithValue("@confirm_3", SqlDbType.Bit).Value = true;
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
        public int SetDataConfirmTwo(MedicalInfoDonator med)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertDataDonatorUnitTwo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@app_id", SqlDbType.Int).Value = med.Code_questioner;
                    cmd.Parameters.AddWithValue("@checker_hemo", SqlDbType.NVarChar).Value = med.Checker_hemog;
                    cmd.Parameters.AddWithValue("@code_hemo", SqlDbType.Int).Value = med.Code_hemog;
                    cmd.Parameters.AddWithValue("@blood_pressure", SqlDbType.Int).Value = med.Blood_pressure;
                    cmd.Parameters.AddWithValue("@noraml_pulse", SqlDbType.Bit).Value = med.Noraml_pulse;
                    cmd.Parameters.AddWithValue("@pulse", SqlDbType.Int).Value = med.Pulse;
                    cmd.Parameters.AddWithValue("@notes_unit_two", SqlDbType.NVarChar).Value = med.Notes_unit_two;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int SetDataConfirmThree(MedicalInfoDonator med)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertDataDonatorUnitThree", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@app_id", SqlDbType.Int).Value = med.App_id;
                    cmd.Parameters.AddWithValue("@bp_checker", SqlDbType.NVarChar).Value = med.Bp_checker;
                    cmd.Parameters.AddWithValue("@checker_name", SqlDbType.NVarChar).Value = med.Checker_name;
                    cmd.Parameters.AddWithValue("@approver", SqlDbType.NVarChar).Value = med.Approver;
                    cmd.Parameters.AddWithValue("@abnormal_response", SqlDbType.Bit).Value = med.Abnormal_response;
                    cmd.Parameters.AddWithValue("@which_response", SqlDbType.NVarChar).Value = med.Which_response;
                    cmd.Parameters.AddWithValue("@went_to_hospital", SqlDbType.Bit).Value = med.Went_to_hospital;
                    cmd.Parameters.AddWithValue("@by_mada", SqlDbType.Bit).Value = med.By_mada;
                    cmd.Parameters.AddWithValue("@refused_evacuate", SqlDbType.Bit).Value = med.Refused_evacuate;
                    cmd.Parameters.AddWithValue("@no_for_platelets", SqlDbType.Bit).Value = med.No_for_platelets;
                    cmd.Parameters.AddWithValue("@blood_for_freeze", SqlDbType.Bit).Value = med.Blood_for_freeze;
                    cmd.Parameters.AddWithValue("@empty_bag", SqlDbType.Bit).Value = med.Empty_bag;
                    cmd.Parameters.AddWithValue("@no_sterile_dose", SqlDbType.Bit).Value = med.No_sterile_dose;
                    cmd.Parameters.AddWithValue("@epmty_tubes", SqlDbType.Bit).Value = med.Epmty_tubes;
                    cmd.Parameters.AddWithValue("@empty_nat_tube", SqlDbType.Bit).Value = med.Empty_nat_tube;
                    cmd.Parameters.AddWithValue("@tube_for_count", SqlDbType.Bit).Value = med.Tube_for_count;
                    cmd.Parameters.AddWithValue("@rich_in_antibodies", SqlDbType.Bit).Value = med.Rich_in_antibodies;
                    cmd.Parameters.AddWithValue("@type_antibody", SqlDbType.NVarChar).Value = med.Type_antibody;
                    cmd.Parameters.AddWithValue("@less_iga", SqlDbType.Bit).Value = med.Less_iga;
                    cmd.Parameters.AddWithValue("@reported_part_b", SqlDbType.Bit).Value = med.Reported_part_b;
                    cmd.Parameters.AddWithValue("@reported_part_c", SqlDbType.Bit).Value = med.Reported_part_c;
                    cmd.Parameters.AddWithValue("@section_part_c", SqlDbType.NVarChar).Value = med.Section_part_c;
                    cmd.Parameters.AddWithValue("@sort", SqlDbType.Bit).Value = med.Sort;
                    cmd.Parameters.AddWithValue("@detail", SqlDbType.Decimal).Value = med.Detail_Iga;
                    cmd.Parameters.AddWithValue("@type_bag", SqlDbType.NVarChar).Value = med.Type_bag;
                    cmd.Parameters.AddWithValue("@dose_weight", SqlDbType.NVarChar).Value = med.Dose_weight;
                    cmd.Parameters.AddWithValue("@qualificat_name", SqlDbType.NVarChar).Value = med.Qualificat_name;
                    cmd.Parameters.AddWithValue("@code_qualificat", SqlDbType.NVarChar).Value = med.Code_qualificat;
                    cmd.Parameters.AddWithValue("@notes_unit_three", SqlDbType.NVarChar).Value = med.Notes_unit_three;
                    cmd.Parameters.AddWithValue("@duration", SqlDbType.NVarChar).Value = med.Duration;
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
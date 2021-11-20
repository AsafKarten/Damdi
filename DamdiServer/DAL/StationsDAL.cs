using DamdiServer.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DamdiServer.DAL
{
    public class StationsDAL
    {
        private readonly string conStr;
        public StationsDAL(string conStr)
        {
            this.conStr = conStr;
        }
        /*Create a new station in Stations table*/
        public int SetNewStation(Stations station)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("InsertNewStation", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@station_code", SqlDbType.Int).Value = station.Station_code;
                    cmd.Parameters.AddWithValue("@city", SqlDbType.NVarChar).Value = station.City;
                    cmd.Parameters.AddWithValue("@f_address", SqlDbType.NVarChar).Value = station.F_address;
                    cmd.Parameters.AddWithValue("@start_time", SqlDbType.DateTime).Value = station.Start_time;
                    cmd.Parameters.AddWithValue("@end_time", SqlDbType.DateTime).Value = station.End_time;
                    cmd.Parameters.AddWithValue("@lat", SqlDbType.Float).Value = station.Lat;
                    cmd.Parameters.AddWithValue("@lng", SqlDbType.Float).Value = station.Lng;
                    int res = cmd.ExecuteNonQuery();
                    return res;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Stations> GetStationList()
        {
            try
            {

                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    List<Stations> Stations = new List<Stations>();
                    Stations s = null;
                    SqlCommand cmd = new SqlCommand("GetStations", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        s = new Stations(
                            Convert.ToInt32(reader["station_code"]),
                            Convert.ToString(reader["station_name"]),
                            Convert.ToString(reader["city"]),
                            Convert.ToString(reader["f_address"]),
                            reader.GetTimeSpan(reader.GetOrdinal("start_time")),
                            reader.GetTimeSpan(reader.GetOrdinal("end_time")),
                            Convert.ToString(reader["lat"]),
                            Convert.ToString(reader["lng"]),
                            Convert.ToString(reader["days"])
                            );
                        Stations.Add(s);
                    }
                    return Stations;
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Stations> GetStationsByCity(Stations station)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    List<Stations> Stations = new List<Stations>();
                    Stations s = null;
                    SqlCommand cmd = new SqlCommand("GetStationsByCity", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@city", SqlDbType.NVarChar).Value = station.City;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        s = new Stations(
                            Convert.ToInt32(reader["station_code"]),
                            Convert.ToString(reader["station_name"]),
                            Convert.ToString(reader["city"]),
                            Convert.ToString(reader["f_address"]),
                            reader.GetTimeSpan(reader.GetOrdinal("start_time")),
                            reader.GetTimeSpan(reader.GetOrdinal("end_time")),
                            Convert.ToString(reader["lat"]),
                            Convert.ToString(reader["lng"]),
                            Convert.ToString(reader["days"])
                            );
                        Stations.Add(s);
                    }
                    return Stations;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public Stations getStationCode(Stations s)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    Stations station = null;
                    SqlCommand cmd = new SqlCommand("GetStationsByCode", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@station_code", SqlDbType.NVarChar).Value = s.Station_code;
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        station = new Stations(
                            Convert.ToInt32(reader["station_code"]),
                            Convert.ToString(reader["station_name"]),
                            Convert.ToString(reader["city"]),
                            Convert.ToString(reader["f_address"]),
                            reader.GetTimeSpan(reader.GetOrdinal("start_time")),
                            reader.GetTimeSpan(reader.GetOrdinal("end_time")),
                            Convert.ToString(reader["lat"]),
                            Convert.ToString(reader["lng"]),
                            Convert.ToString(reader["days"])
                            );
                    }
                    return station;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
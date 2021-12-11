using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class MedicalInfoDonator
    {
        int mi_donator_from;
        int blood_donation_id;
        int site_code;
        int blood_pressure;
        int pulse;
        bool noraml_pulse;
        string bp_checker;
        string checker_name;
        bool hemoglobin;
        string approver;
        bool abnormal_response;
        string which_response;
        bool went_to_hospital;
        bool by_mada;
        bool refused_evacuate;
        bool donator_notes;
        bool no_for_platelets;
        bool blood_for_freeze;
        bool empty_bag;
        bool no_sterile_dose;
        bool epmty_tubes;
        bool empty_nat_tube;
        bool tube_for_count;
        bool rich_in_antibodies;
        string type_antibody;
        bool less_iga;
        bool reported_part_b;
        bool reported_part_c;
        string section_part_c;
        bool sort;
        string detail;
        string type_bag;
        float dose_weight;
        string checker_hemog;
        int code_hemog;
        string qualificat_name;
        int code_qualificat;
        string questioner_name;
        int code_questioner;
        string notes_unit_one;
        string notes_unit_two;
        string notes_unit_three;
        string duration;
        int app_id;

        public MedicalInfoDonator(int mi_donator_from,
            int blood_donation_id,
            int site_code,
            int blood_pressure,
            int pulse,
            bool noraml_pulse,
            string bp_checker,
            string checker_name,
            bool hemoglobin,
            string approver,
            bool abnormal_response,
            string which_response,
            bool went_to_hospital,
            bool by_mada,
            bool refused_evacuate,
            bool donator_notes,
            bool no_for_platelets,
            bool blood_for_freeze,
            bool empty_bag,
            bool no_sterile_dose,
            bool epmty_tubes,
            bool empty_nat_tube,
            bool tube_for_count,
            bool rich_in_antibodies,
            string type_antibody,
            bool less_iga,
            bool reported_part_b,
            bool reported_part_c,
            string section_part_c,
            bool sort,
            string detail,
            string type_bag,
            float dose_weight,
            string checker_hemog,
            int code_hemog,
            string qualificat_name,
            int code_qualificat,
            string questioner_name,
            int code_questioner,
            string notes_unit_one,
            string notes_unit_two,
            string notes_unit_three,
            string duration,
            int app_id
            )
        {
            Mi_donator_from = mi_donator_from;
            Blood_donation_id = blood_donation_id;
            Site_code = site_code;
            Blood_pressure = blood_pressure;
            Pulse = pulse;
            Noraml_pulse = noraml_pulse;
            Bp_checker = bp_checker;
            Checker_name = checker_name;
            Hemoglobin = hemoglobin;
            Approver = approver;
            Abnormal_response = abnormal_response;
            Which_response = which_response;
            Went_to_hospital = went_to_hospital;
            By_mada = by_mada;
            Refused_evacuate = refused_evacuate;
            Donator_notes = donator_notes;
            No_for_platelets = no_for_platelets;
            Blood_for_freeze = blood_for_freeze;
            Empty_bag = empty_bag;
            No_sterile_dose = no_sterile_dose;
            Epmty_tubes = epmty_tubes;
            Empty_nat_tube = empty_nat_tube;
            Tube_for_count = tube_for_count;
            Rich_in_antibodies = rich_in_antibodies;
            Type_antibody = type_antibody;
            Less_iga = less_iga;
            Reported_part_b = reported_part_b;
            Reported_part_c = reported_part_c;
            Section_part_c = section_part_c;
            Sort = sort;
            Detail = detail;
            Type_bag = type_bag;
            Dose_weight = dose_weight;
            Checker_hemog = checker_hemog;
            Code_hemog = code_hemog;
            Qualificat_name = qualificat_name;
            Code_qualificat = code_qualificat;
            Questioner_name = questioner_name;
            Code_questioner = code_questioner;
            Notes_unit_one = notes_unit_one;
            Notes_unit_two = notes_unit_two;
            Notes_unit_three = notes_unit_three;
            Duration = duration;
            App_id = app_id;
        }

        public int Mi_donator_from { get => mi_donator_from; set => mi_donator_from = value; }
        public int Blood_donation_id { get => blood_donation_id; set => blood_donation_id = value; }
        public int Site_code { get => site_code; set => site_code = value; }
        public int Blood_pressure { get => blood_pressure; set => blood_pressure = value; }
        public int Pulse { get => pulse; set => pulse = value; }
        public bool Noraml_pulse { get => noraml_pulse; set => noraml_pulse = value; }
        public string Bp_checker { get => bp_checker; set => bp_checker = value; }
        public string Checker_name { get => checker_name; set => checker_name = value; }
        public bool Hemoglobin { get => hemoglobin; set => hemoglobin = value; }
        public string Approver { get => approver; set => approver = value; }
        public bool Abnormal_response { get => abnormal_response; set => abnormal_response = value; }
        public string Which_response { get => which_response; set => which_response = value; }
        public bool Went_to_hospital { get => went_to_hospital; set => went_to_hospital = value; }
        public bool By_mada { get => by_mada; set => by_mada = value; }
        public bool Refused_evacuate { get => refused_evacuate; set => refused_evacuate = value; }
        public bool Donator_notes { get => donator_notes; set => donator_notes = value; }
        public bool No_for_platelets { get => no_for_platelets; set => no_for_platelets = value; }
        public bool Blood_for_freeze { get => blood_for_freeze; set => blood_for_freeze = value; }
        public bool Empty_bag { get => empty_bag; set => empty_bag = value; }
        public bool No_sterile_dose { get => no_sterile_dose; set => no_sterile_dose = value; }
        public bool Epmty_tubes { get => epmty_tubes; set => epmty_tubes = value; }
        public bool Empty_nat_tube { get => empty_nat_tube; set => empty_nat_tube = value; }
        public bool Tube_for_count { get => tube_for_count; set => tube_for_count = value; }
        public bool Rich_in_antibodies { get => rich_in_antibodies; set => rich_in_antibodies = value; }
        public string Type_antibody { get => type_antibody; set => type_antibody = value; }
        public bool Less_iga { get => less_iga; set => less_iga = value; }
        public bool Reported_part_b { get => reported_part_b; set => reported_part_b = value; }
        public bool Reported_part_c { get => reported_part_c; set => reported_part_c = value; }
        public string Section_part_c { get => section_part_c; set => section_part_c = value; }
        public bool Sort { get => sort; set => sort = value; }
        public string Detail { get => detail; set => detail = value; }
        public string Type_bag { get => type_bag; set => type_bag = value; }
        public float Dose_weight { get => dose_weight; set => dose_weight = value; }
        public string Checker_hemog { get => checker_hemog; set => checker_hemog = value; }
        public int Code_hemog { get => code_hemog; set => code_hemog = value; }
        public string Qualificat_name { get => qualificat_name; set => qualificat_name = value; }
        public int Code_qualificat { get => code_qualificat; set => code_qualificat = value; }
        public string Questioner_name { get => questioner_name; set => questioner_name = value; }
        public int Code_questioner { get => code_questioner; set => code_questioner = value; }
        public int App_id { get => app_id; set => app_id = value; }
        public string Duration { get => duration; set => duration = value; }
        public string Notes_unit_one { get => notes_unit_one; set => notes_unit_one = value; }
        public string Notes_unit_two { get => notes_unit_two; set => notes_unit_two = value; }
        public string Notes_unit_three { get => notes_unit_three; set => notes_unit_three = value; }
    }
}
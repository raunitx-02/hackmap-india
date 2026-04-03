import { Users, Mail, Github, Linkedin } from 'lucide-react';

const TeamCard = ({ team }) => {
  return (
    <div className="bg-[#1E293B] rounded-lg p-6 hover:bg-[#2D3748] transition border border-[#334155]">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{team.name}</h3>
        <p className="text-gray-400 text-sm">{team.lookingFor}</p>
      </div>

      {/* Hackathon */}
      <div className="mb-4">
        <span className="text-xs text-gray-500">Registered for</span>
        <p className="text-white font-medium">{team.hackathonTitle}</p>
      </div>

      {/* Current Members */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-sm text-gray-300">Team Members ({team.currentMembers}/{team.maxMembers})</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {team.members.map((member, idx) => (
            <div
              key={idx}
              className="px-3 py-1 bg-[#334155] text-gray-300 text-xs rounded-full"
            >
              {member.name}
            </div>
          ))}
        </div>
      </div>

      {/* Skills Required */}
      {team.skillsRequired && team.skillsRequired.length > 0 && (
        <div className="mb-4">
          <span className="text-sm text-gray-400 block mb-2">Skills Needed:</span>
          <div className="flex flex-wrap gap-2">
            {team.skillsRequired.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[#0A0E27] text-[#3B82F6] text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      {team.leader && (
        <div className="pt-4 border-t border-[#334155]">
          <p className="text-sm text-gray-400 mb-2">Team Leader:</p>
          <div className="flex items-center justify-between">
            <p className="text-white font-medium">{team.leader.name}</p>
            <div className="flex gap-2">
              {team.leader.email && (
                <a
                  href={`mailto:${team.leader.email}`}
                  className="text-gray-400 hover:text-white transition"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {team.leader.github && (
                <a
                  href={team.leader.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {team.leader.linkedin && (
                <a
                  href={team.leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Join Button */}
      <button className="w-full mt-4 px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition font-medium">
        Request to Join
      </button>
    </div>
  );
};

export default TeamCard;

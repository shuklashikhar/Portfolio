// src/components/CPStats.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Code2, Trophy, Target } from "lucide-react";

const DEFAULT_LEET_TOTAL = 3000;

// ====== EDIT THESE HANDLES (replace placeholders with your usernames) ======
// You can either hardcode your usernames here, or set Vite env vars:
// Vite env example: VITE_LEETCODE=yourHandle
const HANDLES = {
  leetcode: "shikharshukla07",
  codeforces: "shuklashikhar",
  codechef: "laughtale2003",
  gfg: "shuklashikhar",
};
// =========================================================================

const CPStats = () => {
  const [stats, setStats] = useState({
    leetcode: {
      solved: 0,
      total: DEFAULT_LEET_TOTAL,
      easy: 0,
      medium: 0,
      hard: 0,
      loading: true,
    },
    codeforces: {
      rating: 0,
      problems: 0,
      maxRating: 0,
      rank: "",
      loading: true,
    },
    codechef: { rating: null, problems: "NA", maxRating: null, loading: true },
    gfg: { problems: "NA", rating: "NA", codingScore: "NA", loading: true },
  });

  const normalizeResponse = async (resp) => {
    try {
      const json = await resp.json();
      return json;
    } catch (err) {
      console.error("Failed to parse JSON response:", err);
      return null;
    }
  };

  // LeetCode
  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        // Primary public API (may fail sometimes)
        const primary = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${HANDLES.leetcode}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          }
        );
        if (primary.ok) {
          const data = await normalizeResponse(primary);
          if (
            data &&
            (data.status === "success" || data.totalSolved !== undefined)
          ) {
            setStats((prev) => ({
              ...prev,
              leetcode: {
                solved: data.totalSolved || 0,
                total: data.totalQuestions || DEFAULT_LEET_TOTAL,
                easy: data.easySolved || 0,
                medium: data.mediumSolved || 0,
                hard: data.hardSolved || 0,
                loading: false,
              },
            }));
            return;
          }
        }

        // Fallback API
        const fallback = await fetch(
          `https://leetcode-api-faisalshohag.vercel.app/${HANDLES.leetcode}`
        );
        if (fallback.ok) {
          const data = await normalizeResponse(fallback);
          if (data && data.totalSolved !== undefined) {
            setStats((prev) => ({
              ...prev,
              leetcode: {
                solved: data.totalSolved || 0,
                total: data.totalQuestions || DEFAULT_LEET_TOTAL,
                easy: data.easySolved || 0,
                medium: data.mediumSolved || 0,
                hard: data.hardSolved || 0,
                loading: false,
              },
            }));
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching LeetCode:", error);
      } finally {
        setStats((prev) => ({
          ...prev,
          leetcode: { ...prev.leetcode, loading: false },
        }));
      }
    };

    fetchLeetCode();
  }, []);

  // Codeforces
  useEffect(() => {
    const fetchCodeforces = async () => {
      try {
        const handle = HANDLES.codeforces;
        if (!handle) throw new Error("Codeforces handle missing");

        const infoResp = await fetch(
          `https://codeforces.com/api/user.info?handles=${encodeURIComponent(
            handle
          )}`
        );
        if (infoResp.ok) {
          const info = await normalizeResponse(infoResp);
          if (
            info &&
            info.status === "OK" &&
            info.result &&
            info.result.length > 0
          ) {
            const user = info.result[0];
            setStats((prev) => ({
              ...prev,
              codeforces: {
                rating: user.rating || 0,
                maxRating: user.maxRating || 0,
                rank: user.rank || "unrated",
                problems: prev.codeforces.problems || 0,
                loading: false,
              },
            }));
          }
        }

        const subResp = await fetch(
          `https://codeforces.com/api/user.status?handle=${encodeURIComponent(
            handle
          )}`
        );
        if (subResp.ok) {
          const subData = await normalizeResponse(subResp);
          if (
            subData &&
            subData.status === "OK" &&
            Array.isArray(subData.result)
          ) {
            const solvedSet = new Set();
            subData.result.forEach((sub) => {
              if (sub.verdict === "OK") {
                solvedSet.add(`${sub.problem.contestId}${sub.problem.index}`);
              }
            });
            setStats((prev) => ({
              ...prev,
              codeforces: {
                ...prev.codeforces,
                problems: solvedSet.size,
                loading: false,
              },
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching Codeforces:", error);
        setStats((prev) => ({
          ...prev,
          codeforces: { ...prev.codeforces, loading: false },
        }));
      }
    };

    fetchCodeforces();
  }, []);

  // CodeChef (calls your backend; backend should have endpoint like /fetch-codechef/:username)
  useEffect(() => {
    const fetchCodeChef = async () => {
      try {
        const username = HANDLES.codechef;
        if (!username) throw new Error("CodeChef username missing");
        const urlBase = import.meta.env.VITE_API_URL || ""; // set this to http://localhost:5000 in dev
        const resp = await fetch(
          `${urlBase}/fetch-codechef/${encodeURIComponent(username)}`
        );
        if (!resp.ok) {
          console.warn("CodeChef endpoint non-OK:", resp.status);
          setStats((prev) => ({
            ...prev,
            codechef: { ...prev.codechef, loading: false },
          }));
          return;
        }

        const payload = await normalizeResponse(resp);
        console.log("CodeChef payload:", payload);
        let source = null;
        if (!payload) source = null;
        else if (payload.ok && payload.data) source = payload.data;
        else source = payload;

        const rating = source?.rating ?? (source?.rating === 0 ? "0" : null);
        const highestRating =
          source?.highestRating ?? source?.maxRating ?? null;
        const totalSolved =
          source?.totalSolved ??
          source?.problems ??
          source?.problemsSolved ??
          null;

        setStats((prev) => ({
          ...prev,
          codechef: {
            rating: rating ?? null,
            maxRating: highestRating ?? null,
            problems: totalSolved ?? "NA",
            loading: false,
          },
        }));
      } catch (error) {
        console.error("Error fetching CodeChef:", error);
        setStats((prev) => ({
          ...prev,
          codechef: { ...prev.codechef, loading: false },
        }));
      }
    };

    fetchCodeChef();
  }, []);

  // GeeksforGeeks (calls your backend; backend should have endpoint like /fetch-gfg/:username)
  useEffect(() => {
    const fetchGFG = async () => {
      try {
        const username = HANDLES.gfg;
        if (!username) throw new Error("GfG username missing");
        const urlBase = import.meta.env.VITE_API_URL || "";
        const resp = await fetch(
          `${urlBase}/fetch-gfg/${encodeURIComponent(username)}`
        );
        if (!resp.ok) {
          console.warn("GFG endpoint non-OK:", resp.status);
          setStats((prev) => ({
            ...prev,
            gfg: { ...prev.gfg, loading: false },
          }));
          return;
        }

        const payload = await normalizeResponse(resp);
        console.log("GFG payload:", payload);
        let source = null;
        if (!payload) source = null;
        else if (payload.ok && payload.data) source = payload.data;
        else source = payload;

        const problemsSolved =
          source?.problemsSolved ??
          source?.problems ??
          source?.problemsSolvedCount ??
          "NA";
        const contestRating = source?.contestRating ?? source?.rating ?? "NA";
        const codingScore = source?.codingScore ?? "NA";

        setStats((prev) => ({
          ...prev,
          gfg: {
            problems: problemsSolved,
            rating: contestRating,
            codingScore: codingScore,
            loading: false,
          },
        }));
      } catch (error) {
        console.error("Error fetching GFG:", error);
        setStats((prev) => ({ ...prev, gfg: { ...prev.gfg, loading: false } }));
      }
    };

    fetchGFG();
  }, []);

  const platforms = [
    {
      name: "LeetCode",
      icon: Code2,
      color: "#FFA116",
      data: stats.leetcode,
      url: `https://leetcode.com/${HANDLES.leetcode}`,
      details: [
        { label: "Easy", value: stats.leetcode.easy ?? 0 },
        { label: "Medium", value: stats.leetcode.medium ?? 0 },
        { label: "Hard", value: stats.leetcode.hard ?? 0 },
      ],
    },
    {
      name: "Codeforces",
      icon: Trophy,
      color: "#1F8ACB",
      data: { ...stats.codeforces, solved: stats.codeforces.problems },
      url: `https://codeforces.com/profile/${HANDLES.codeforces}`,
      details: [
        { label: "Rating", value: stats.codeforces.rating ?? "N/A" },
        { label: "Max Rating", value: stats.codeforces.maxRating ?? "N/A" },
        { label: "Rank", value: stats.codeforces.rank ?? "unrated" },
      ],
    },
    {
      name: "CodeChef",
      icon: Target,
      color: "#5B4638",
      data: { ...stats.codechef, solved: stats.codechef.problems, total: 0 },
      url: `https://www.codechef.com/users/${HANDLES.codechef}`,
      details: [
        { label: "Rating", value: stats.codechef.rating ?? "N/A" },
        { label: "Max Rating", value: stats.codechef.maxRating ?? "N/A" },
        { label: "Problems", value: stats.codechef.problems ?? "N/A" },
      ],
    },
    {
      name: "GeeksforGeeks",
      icon: TrendingUp,
      color: "#2F8D46",
      data: { ...stats.gfg, solved: stats.gfg.problems, total: 0 },
      url: `https://www.geeksforgeeks.org/user/${HANDLES.gfg}/`,
      details: [
        { label: "Rating", value: stats.gfg.rating ?? "N/A" },
        { label: "Coding Score", value: stats.gfg.codingScore ?? "N/A" },
        { label: "Problems", value: stats.gfg.problems ?? "N/A" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-full p-6 bg-[#FFFEF9] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-[rgba(99,102,241,0.1)]">
      <motion.p
        className="text-sm text-[#4a4a4a] mb-3 text-center font-medium italic"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Not just vibe coding
      </motion.p>
      <motion.h3
        className="text-xl font-bold text-[#1a1a1a] mb-6 text-center font-mono"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Problem Solving
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          const { data } = platform;
          const totalCount = Number(data.total) || 0;
          const solvedCount = data.solved ?? data.problems ?? 0;
          const progress =
            totalCount > 0 ? Number(solvedCount || 0) / totalCount : 0;

          return (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-[#f8f9fa] to-[#FFFEF9] rounded-xl p-4 no-underline text-[#1a1a1a] border-2 border-[rgba(99,102,241,0.1)] transition-all duration-300 flex flex-col gap-3 relative overflow-hidden hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-nav-color to-accent-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

              <div className="flex items-center gap-2 mb-1">
                <Icon size={24} color={platform.color} />
                <span className="text-sm font-semibold text-[#1a1a1a] font-mono">
                  {platform.name}
                </span>
              </div>

              {data.loading ? (
                <div className="flex flex-col items-center justify-center gap-2 py-4 text-[#4a4a4a] text-sm">
                  <div className="w-6 h-6 border-[3px] border-[rgba(99,102,241,0.2)] border-t-nav-color rounded-full animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#1a1a1a] leading-none">
                      {platform.name === "LeetCode" ||
                      platform.name === "GeeksforGeeks"
                        ? data.solved ?? "NA"
                        : platform.name === "Codeforces"
                        ? data.solved ?? data.problems ?? "NA"
                        : platform.name === "CodeChef"
                        ? data.problems ?? data.rating ?? "NA"
                        : data.solved ?? data.rating ?? "NA"}
                    </span>

                    {data.total > 0 && (
                      <span className="text-base text-[#4a4a4a] font-normal">
                        / {data.total}
                      </span>
                    )}

                    {platform.name === "Codeforces" &&
                      data.total === 0 &&
                      (data.solved || data.problems) && (
                        <span className="text-sm text-[#4a4a4a] font-normal ml-1">
                          {" "}
                          problems
                        </span>
                      )}
                    {platform.name === "CodeChef" &&
                      data.total === 0 &&
                      data.problems && (
                        <span className="text-sm text-[#4a4a4a] font-normal ml-1">
                          {" "}
                          solved
                        </span>
                      )}
                  </div>

                  {data.total > 0 && progress > 0 && (
                    <div className="w-full h-1.5 bg-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden mt-2">
                      <motion.div
                        className="h-full rounded-[10px] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                        style={{
                          backgroundColor: platform.color,
                          width: `${Math.min(progress * 100, 100)}%`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress * 100, 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  )}

                  {platform.details.length > 0 && (
                    <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[rgba(0,0,0,0.1)]">
                      {platform.details.map((detail, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-[#4a4a4a] font-medium">
                            {detail.label}:
                          </span>
                          <span className="text-[#1a1a1a] font-semibold font-mono">
                            {detail.value ?? "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default CPStats;

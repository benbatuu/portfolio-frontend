import { Navbar } from "../../components/Navbar/Navbar";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

interface GitHubRepo {
  [x: string]: any;
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export const Projects = () => {
  const { t } = useTranslation();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // GitHub kullanıcı adınızı buraya yazın
  const GITHUB_USERNAME = "benbatuu";

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        setLoading(true);
        
        // GitHub API'den repolarınızı çekin
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`
        );
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data: GitHubRepo[] = await response.json();
        
        // Fork olmayan ve description'ı olan repoları filtreleyin
        const filteredRepos = data
          .filter(repo => !repo.fork && repo.description)
        
        setRepos(filteredRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  // Teknoloji isimlerini renkli etiketler için normalize et
  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-500/20 text-yellow-300',
      'TypeScript': 'bg-blue-500/20 text-blue-300',
      'React': 'bg-cyan-500/20 text-cyan-300',
      'Next.js': 'bg-white/20 text-white',
      'Node.js': 'bg-green-500/20 text-green-300',
      'Python': 'bg-green-600/20 text-green-400',
      'Java': 'bg-orange-500/20 text-orange-300',
      'C++': 'bg-purple-500/20 text-purple-300',
      'HTML': 'bg-orange-600/20 text-orange-400',
      'CSS': 'bg-blue-600/20 text-blue-400',
    };
    return colors[tech] || 'bg-[#1E2D3D] text-[#607B96]';
  };

  // Tarihi formatla
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#010C15] to-[#011221] text-[#607B96]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#43D9AD] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>{t('projects.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#010C15] to-[#011221] text-[#607B96]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400">Hata: {error}</p>
            <p className="text-sm mt-2">GitHub kullanıcı adınızı kontrol edin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010C15] to-[#011221] text-[#607B96]">
      <Navbar />

      {/* Main Content */}
      <div className="p-8 overflow-y-auto max-h-screen pb-40">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl text-white">{t('projects.title')}</h2>
          <p className="text-sm">
            <span className="text-[#43D9AD]">{repos.length}</span> {t('projects.shown')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="border border-[#1E2D3D] rounded-lg p-6 hover:border-[#607B96] transition-all duration-300 hover:shadow-lg hover:shadow-[#43D9AD]/10"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl text-white font-semibold">{repo.name}</h3>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#43D9AD]">🍴</span>
                    {repo.forks_count}
                  </span>
                </div>
              </div>
              
              <p className="mb-4 text-sm leading-relaxed">
                {repo.description || 'Bu proje için açıklama bulunmuyor.'}
              </p>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {repo.language && (
                    <span className={`text-xs px-2 py-1 rounded-md ${getTechColor(repo.language)}`}>
                      {repo.language}
                    </span>
                  )}
                  {repo.topics.slice(0, 3).map((topic, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-[#1E2D3D] rounded-md text-[#607B96] capitalize"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#4D5BCE]">
                  {t("common.lastupdated")} {formatDate(repo.updated_at)}
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#43D9AD] hover:underline flex items-center gap-1"
                >
                  <span>🔗</span>
                  GitHub'da Görüntüle
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#43D9AD] hover:underline flex items-center gap-1"
                  >
                    <span>🚀</span>
                    Canlı Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {repos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg mb-2">Henüz proje bulunamadı</p>
            <p className="text-sm">GitHub kullanıcı adınızı kontrol edin veya repolarınızın public olduğundan emin olun</p>
          </div>
        )}
      </div>
    </div>
  );
};
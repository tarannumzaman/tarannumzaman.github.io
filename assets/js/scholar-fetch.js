/**
 * Semantic Scholar Publications Fetcher (No API Key Required)
 * Fetches publications from Semantic Scholar API
 * 
 * API Documentation: https://api.semanticscholar.org/
 */

class ScholarFetcher {
  constructor(authorId, paperIds = null) {
    this.authorId = authorId;
    this.paperIds = paperIds; // Not used for Semantic Scholar API
    this.baseUrl = 'https://api.semanticscholar.org/graph/v1';
  }

  /**
   * Fetch all publications or filter by year
   * @param {string|null} filterByYear - Optional year filter (e.g., "2025-" for 2025 onwards)
   * @returns {Promise<Array>} Array of publications
   */
  async fetchPublications(filterByYear = null) {
    try {
      let url = `${this.baseUrl}/author/${this.authorId}/papers?fields=title,year,authors,paperId,externalIds`;
      
      // Add year filter if provided
      if (filterByYear) {
        url += `&year=${filterByYear}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching publications:', error);
      throw error;
    }
  }

  /**
   * Group publications by year
   * @param {Array} publications - Array of publication objects
   * @returns {Map} Publications grouped by year (sorted descending: newest first)
   */
  groupByYear(publications) {
    const grouped = {};
    
    publications.forEach(paper => {
      const year = paper.year || 'Unknown';
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(paper);
    });
    
    // Sort years in descending order (2026, 2025, 2024, etc.) and use Map to preserve order
    const sortedGrouped = new Map();
    Object.keys(grouped)
      .sort((a, b) => {
        // Handle 'Unknown' year
        if (a === 'Unknown') return 1;
        if (b === 'Unknown') return -1;
        
        // Convert to integers and sort descending (newest first)
        const yearA = parseInt(a, 10);
        const yearB = parseInt(b, 10);
        return yearB - yearA; // Descending: 2026 before 2025
      })
      .forEach(year => {
        sortedGrouped.set(year, grouped[year]);
      });
    
    return sortedGrouped;
  }

  static getPaperLink(paper) {
    // Build paper link from externalIds (priority: DOI > ArXiv > Semantic Scholar)
    let paperLink = null;
    if (paper.externalIds) {
      if (paper.externalIds.ArXiv) {
        paperLink = `https://arxiv.org/abs/${paper.externalIds.ArXiv}`;
      } else if (paper.externalIds.DOI) {
        paperLink = `https://doi.org/${paper.externalIds.DOI}`;
      } else if (paper.externalIds.corpusId) {
        paperLink = `https://www.semanticscholar.org/paper/${paper.externalIds.corpusId}`;
      }
    }
    // Fallback to Semantic Scholar if no external ID
    if (!paperLink && paper.paperId) {
      paperLink = `https://www.semanticscholar.org/paper/${paper.paperId}`;
    }
    return paperLink;
  }

  /**
   * Render publications to a DOM container
   * @param {Map} groupedPublications - Publications grouped by year
   * @returns {string} HTML string
   */
  static renderPublications(groupedPublications) {
    let html = '<div class="scholar-publications">';
    
    // Iterate over Map entries (preserves insertion order)
    for (const [year, papers] of groupedPublications.entries()) {
      html += `<h3>${year}</h3>`;
      html += '<ul class="publication-list">';
      
      papers.forEach(paper => {
        html += '<li class="publication-item">';
        
        // Build paper link from externalIds (priority: DOI > ArXiv > Semantic Scholar)
        let paperLink = ScholarFetcher.getPaperLink(paper);
        
        // Render title with or without link
        if (paperLink) {
          html += `<div class="pub-title"><a href="${paperLink}" target="_blank">${paper.title}</a></div>`;
        } else {
          html += `<div class="pub-title">${paper.title}</div>`;
        }
        
        if (paper.authors && paper.authors.length > 0) {
          const authorNames = paper.authors.map(a => a.name).join(', ');
          html += `<div class="pub-authors">${authorNames}</div>`;
        }
        
        html += '</li>';
      });
      
      html += '</ul>';
    }
    
    html += '</div>';
    return html;
  }
}

/**
 * Initialize and load publications into the page
 */
async function initScholarPublications() {
  const container = document.getElementById('scholar-publications');
  if (!container) return;
  
  const authorId = container.getAttribute('data-author-id');
  if (!authorId) {
    console.error('Author ID not found');
    return;
  }
  
  try {
    const fetcher = new ScholarFetcher(authorId);
    
    // Get optional year filter
    const yearFilter = container.getAttribute('data-year-filter');
    
    // Fetch publications with optional year filter
    const publications = await fetcher.fetchPublications(yearFilter);
    
    // Group by year
    const grouped = fetcher.groupByYear(publications);
    
    // Render publications
    container.innerHTML = ScholarFetcher.renderPublications(grouped);
    
  } catch (error) {
    container.innerHTML = `
      <div class="scholar-error">
        <strong>Error loading publications:</strong> ${error.message}
        <br>Please try again later or visit 
        <a href="https://www.semanticscholar.org/author/${authorId}" target="_blank">Semantic Scholar profile</a> directly.
      </div>
    `;
    console.error('Error loading publications:', error);
  }
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScholarPublications);
  } else {
    initScholarPublications();
  }
}


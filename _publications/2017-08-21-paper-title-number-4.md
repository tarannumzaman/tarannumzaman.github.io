---
title: "Descry: reproducing system-level concurrency failures"
collection: publications
permalink: /publication/2017-08-21-paper-title-number-4
#excerpt: 
date: 2017-08-21
venue: 'Proceedings of the 2017 11th Joint Meeting on Foundations of Software Engineering'
paperurl: 'https://dl.acm.org/doi/abs/10.1145/3106237.3106266'
citation: 'Tingting Yu, Tarannum S. Zaman, and Chao Wang. 2017. DESCRY: reproducing system-level concurrency failures. In Proceedings of the 2017 11th Joint Meeting on Foundations of Software Engineering (ESEC/FSE 2017). Association for Computing Machinery, New York, NY, USA, 694–704. DOI:https://doi.org/10.1145/3106237.3106266.'
---
[Download paper here](https://par.nsf.gov/servlets/purl/10075449)

Abstract: Concurrent systems may fail in the field due to various elusive faults such as race conditions. Reproducing such failures is hard because (1) concurrency failures at the system level often involve multiple processes or event handlers (e.g., software signals), which cannot be handled by existing tools for reproducing intra-process (thread-level) failures; (2) detailed field data, such as user input, file content and interleaving schedule, may not be available to developers; and (3) the debugging environment may differ from the deployed environment, which further complicates failure reproduction. To address these problems, we present DESCRY, the first fully automated tool for reproducing system-level concurrency failures based only on default log messages collected from the field. DESCRY uses a combination of static and dynamic analysis techniques, together with symbolic execution, to synthesize both the failure-inducing data input and the interleaving schedule, and leverages them to deterministically replay the failed execution using existing virtual platforms. We have evaluated DESCRY on 22 realworld multi-process Linux applications with a total of 236,875 lines of code to demonstrate both its effectiveness and its efficiency in reproducing failures that no other tool can reproduce.
